import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import { createClerkClient, verifyToken } from '@clerk/backend';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { sendNotificationEmail } from './utils/mailer';
import { rateLimit } from 'express-rate-limit';
import DOMPurify from 'isomorphic-dompurify';


const app = express();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const PORT = process.env.PORT || 5000;

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// --- RATE LIMITERS ---

// General limiter: Apply to all requests
const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 10, // Limit each IP to 100 requests per window
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});

// Strict limiter: Apply to form submissions to prevent spam
const submissionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 5, // Limit each IP to 5 submissions per hour
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Submission limit reached. Please wait an hour before trying again.' }
});

app.use(cors());
app.use(generalLimiter);
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ limit: '50kb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed (jpeg, jpg, png, webp)'));
    },
});

// Clerk Authentication Middleware
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const sessionClaims = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });

        if (!sessionClaims) {
            return res.status(401).json({ error: 'Invalid session' });
        }
        const userEmail = sessionClaims.email as string;
        if (userEmail != process.env.ADMIN_EMAIL) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    } catch (error) {
        console.error('Auth check failed:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// --- PUBLIC ROUTES ---

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Nishyash API is running' });
});

// Submit Lead (Contact Form)
app.post('/api/leads', submissionLimiter, async (req, res) => {
    try {
        const { firstName, lastName, email, phone, subject, message } = req.body;

        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const sanitizedFirstName = DOMPurify.sanitize(firstName, { ALLOWED_TAGS: [] });
        const sanitizedLastName = DOMPurify.sanitize(lastName, { ALLOWED_TAGS: [] });
        const sanitizedSubject = DOMPurify.sanitize(subject, { ALLOWED_TAGS: [] });
        const sanitizedMessage = DOMPurify.sanitize(message, { ALLOWED_TAGS: [] });

        const lead = await prisma.lead.create({
            data: {
                firstName: sanitizedFirstName,
                lastName: sanitizedLastName,
                email, // Email usually doesn't need HTML sanitization, just validation
                phone,
                subject: sanitizedSubject,
                message: sanitizedMessage,
            },
        });
        await sendNotificationEmail(
            `New Lead: ${sanitizedSubject}`,
            `<p><strong>Name:</strong> ${sanitizedFirstName} ${sanitizedLastName}</p>` +
            `<p><strong>Email:</strong> ${email}</p>` +
            `<p><strong>Phone:</strong> ${phone}</p>` +
            `<p><strong>Message:</strong> ${sanitizedMessage}</p>`
        );

        res.status(201).json({ message: 'Lead submitted successfully', id: lead.id });
    } catch (error) {
        console.error('Error submitting lead:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Submit Quote Request
app.post('/api/quotes', requireAuth, submissionLimiter, async (req, res) => {
    try {
        const { fullName, companyName, email, phone, additionalNotes, items } = req.body;

        if (!fullName || !companyName || !email || !phone || !items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Missing required fields or invalid items' });
        }

        const sanitizedFullName = DOMPurify.sanitize(fullName, { ALLOWED_TAGS: [] });
        const sanitizedCompanyName = DOMPurify.sanitize(companyName, { ALLOWED_TAGS: [] });
        const sanitizedNotes = additionalNotes ? DOMPurify.sanitize(additionalNotes, { ALLOWED_TAGS: [] }) : null;

        // Fetch products from DB to verify they exist and get their REAL names
        const productIds = items.map((item: any) => item.id);
        const dbProducts = await prisma.product.findMany({
            where: { id: { in: productIds } }
        });

        // Check if all requested products actually exist in our DB
        if (dbProducts.length !== items.length) {
            return res.status(400).json({ error: 'One or more products in your cart are invalid or no longer available.' });
        }

        const quoteRequest = await prisma.quoteRequest.create({
            data: {
                fullName: sanitizedFullName,
                companyName: sanitizedCompanyName,
                email,
                phone,
                additionalNotes: sanitizedNotes,
                items: {
                    create: items.map((item: any) => {
                        const realProduct = dbProducts.find(p => p.id === item.id);
                        return {
                            productId: item.id,
                            productName: realProduct!.name, // Use the real name from DB, NOT the one from the client
                            quantity: item.quantity,
                        };
                    }),
                },
            },
            include: {
                items: true,
            },
        });
        // ... inside app.post('/api/quotes') after quoteRequest is created
        await sendNotificationEmail(
            `New Quote Request from ${sanitizedFullName}`,
            `<h3>Customer Details</h3>
            <p><strong>Company:</strong> ${sanitizedCompanyName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Items:</strong> ${items.length} products requested</p>
            <p><strong>Notes:</strong> ${sanitizedNotes || 'N/A'}</p>`
        );
        res.status(201).json({ message: 'Quote request submitted successfully', id: quoteRequest.id });
    } catch (error) {
        console.error('Error submitting quote:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- PROTECTED ADMIN ROUTES ---

// Category Management
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: { products: true },
        });
        res.json(categories);
    } catch (error) {
        console.error('Fetch categories error:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

app.post('/api/admin/categories', requireAuth, async (req, res) => {
    try {
        const { id, name, description, icon } = req.body;
        // Use name to derive ID if ID not provided (slugify simple version)
        const slug = id || name.toLowerCase().replaceAll(' ', '-').replace(/[^\w-]+/g, '');
        const category = await prisma.category.create({
            data: {
                id: slug,
                name,
                description,
                icon
            }
        });
        res.status(201).json(category);
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

app.patch('/api/admin/categories/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, icon } = req.body;
        const category = await prisma.category.update({
            where: { id: id as string },
            data: { name, description, icon }
        });
        res.json(category);
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
});

app.delete('/api/admin/categories/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({ where: { id: id as string } });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

// Product Management
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(products);
    } catch (error) {
        console.error('Fetch products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.post('/api/admin/products', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, categoryId, inStock, defaultQuantity, tags } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        // Parse tags if it's a string (comma separated)
        let tagsArray: string[] = [];
        if (typeof tags === 'string') {
            tagsArray = tags.split(',').map(t => t.trim()).filter(t => t !== '');
        } else if (Array.isArray(tags)) {
            tagsArray = tags;
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: Number.parseFloat(price),
                image: imageUrl,
                categoryId,
                inStock: inStock === 'true' || inStock === true,
                defaultQuantity: Number.parseInt(defaultQuantity) || 1,
                tags: tagsArray
            },
        });
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

app.patch('/api/admin/products/:id', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId, inStock, defaultQuantity, tags } = req.body;

        const updateData: any = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = Number.parseFloat(price);
        if (categoryId) updateData.categoryId = categoryId;
        if (inStock !== undefined) updateData.inStock = inStock === 'true' || inStock === true;
        if (defaultQuantity) updateData.defaultQuantity = Number.parseInt(defaultQuantity);
        if (req.file) updateData.image = `/uploads/${req.file.filename}`;

        if (tags !== undefined) {
            if (typeof tags === 'string') {
                updateData.tags = tags.split(',').map(t => t.trim()).filter(t => t !== '');
            } else if (Array.isArray(tags)) {
                updateData.tags = tags;
            }
        }

        const product = await prisma.product.update({
            where: { id: id as string },
            data: updateData,
        });
        res.json(product);
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

app.get('/api/products/:id/related', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: id as string },
            select: { categoryId: true, tags: true }
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Smarter related logic: Same category OR overlap in tags
        const related = await prisma.product.findMany({
            where: {
                id: { not: id as string },
                OR: [
                    { categoryId: product.categoryId },
                    { tags: { hasSome: product.tags } }
                ]
            },
            include: { category: true },
            take: 4,
            orderBy: { createdAt: 'desc' }
        });

        res.json(related);
    } catch (error) {
        console.error('Fetch related products error:', error);
        res.status(500).json({ error: 'Failed to fetch related products' });
    }
});

app.delete('/api/admin/products/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({ where: { id: id as string } });
        if (product?.image) {
            const filePath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        await prisma.product.delete({ where: { id: id as string } });
        res.json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// Get all Leads
app.get('/api/admin/leads', requireAuth, async (req, res) => {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all Quote Requests
app.get('/api/admin/quotes', requireAuth, async (req, res) => {
    try {
        const quotes = await prisma.quoteRequest.findMany({
            include: { items: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            return res.json([]);
        }

        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { description: { contains: q, mode: 'insensitive' } },
                    { category: { name: { contains: q, mode: 'insensitive' } } }
                ]
            },
            include: { category: true },
            take: 10
        });
        res.json(products);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Failed to perform search' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
