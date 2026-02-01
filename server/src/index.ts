import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- PUBLIC ROUTES ---

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Nishyash API is running' });
});

// Submit Lead (Contact Form)
app.post('/api/leads', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, subject, message } = req.body;

        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const lead = await prisma.lead.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                subject,
                message,
            },
        });

        res.status(201).json({ message: 'Lead submitted successfully', id: lead.id });
    } catch (error) {
        console.error('Error submitting lead:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Submit Quote Request
app.post('/api/quotes', async (req, res) => {
    try {
        const { fullName, companyName, email, phone, additionalNotes, items } = req.body;

        if (!fullName || !companyName || !email || !phone || !items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Missing required fields or invalid items' });
        }

        const quoteRequest = await prisma.quoteRequest.create({
            data: {
                fullName,
                companyName,
                email,
                phone,
                additionalNotes,
                items: {
                    create: items.map((item: any) => ({
                        productId: item.id,
                        productName: item.name,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        res.status(201).json({ message: 'Quote request submitted successfully', id: quoteRequest.id });
    } catch (error) {
        console.error('Error submitting quote:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
