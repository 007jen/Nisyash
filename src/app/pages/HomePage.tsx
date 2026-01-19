import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Clock, Shield, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { categories, products, testimonials } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';
import Banner from '../../assets/Banner1.jpeg';

// Dynamically import icon components based on category icon name
const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Briefcase: () => import('lucide-react').then(m => m.Briefcase),
    Heart: () => import('lucide-react').then(m => m.Heart),
    Gift: () => import('lucide-react').then(m => m.Gift),
    Shirt: () => import('lucide-react').then(m => m.Shirt),
    Coffee: () => import('lucide-react').then(m => m.Coffee),
    FolderOpen: () => import('lucide-react').then(m => m.FolderOpen),
    Award: () => import('lucide-react').then(m => m.Award),
    Leaf: () => import('lucide-react').then(m => m.Leaf)
  };

  return icons[iconName] || (() => import('lucide-react').then(m => m.Gift));
};

const slides = [
  {
    id: 1,
    image: Banner,
    title: "Corporate Gifting Solutions",
    subtitle: "Build relationships that last.",
    ctaText: "Request Bulk Quote",
    ctaLink: "/quote",
    description: "Premium bulk orders for employees, clients, and partners."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
    title: "Personalized for Loved Ones",
    subtitle: "Make every occasion special.",
    ctaText: "Shop Collection",
    ctaLink: "/#products", // Anchor link to products
    description: "Curated hampers and custom gifts for weddings, festivals, and birthdays."
  }
];

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-background pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">
          {/* Text Content */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12 lg:py-0 order-2 lg:order-1 bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="text-left space-y-6"
              >
                <div>
                  <Badge variant="outline" className="mb-4 text-primary border-primary/20 px-4 py-1 rounded-full">
                    {currentSlide === 0 ? "Corporate Solutions" : "Personal Gifting"}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
                    {slides[currentSlide].title}
                  </h1>
                </div>

                <h2 className="text-xl md:text-2xl font-medium text-secondary/80">
                  {slides[currentSlide].subtitle}
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {slides[currentSlide].description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to={slides[currentSlide].ctaLink}>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto transition-all rounded-full">
                      {slides[currentSlide].ctaText}
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Content */}
          <div className="relative h-[50vh] lg:h-auto overflow-hidden order-1 lg:order-2 bg-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />

                {/* Subtle gradient overlay at the bottom for better edge definition if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">About Nishyash Corporation</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We are a leading provider of corporate and personalised gifting solutions, dedicated to helping businesses create lasting impressions. With years of experience in the industry, we understand the importance of quality, customization, and timely delivery.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-accent" size={24} />
                  <span>Premium quality products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-accent" size={24} />
                  <span>Custom branding options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-accent" size={24} />
                  <span>Dedicated customer support</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1496180470114-6ef490f3ff22"
                alt="About Us"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Why Choose Nishyash</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for professional gifting solutions
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="text-accent" size={32} />,
                title: 'One-Stop Solution',
                description: 'Complete gifting services from selection to delivery'
              },
              {
                icon: <Star className="text-accent" size={32} />,
                title: 'Custom Branding',
                description: 'Personalize every gift with your brand identity'
              },
              {
                icon: <Clock className="text-accent" size={32} />,
                title: 'Timely Delivery',
                description: 'Reliable logistics ensuring on-time delivery'
              },
              {
                icon: <Shield className="text-accent" size={32} />,
                title: 'Quality Assurance',
                description: 'Premium products with strict quality control'
              },
              {
                icon: <CheckCircle className="text-accent" size={32} />,
                title: 'Dedicated Support',
                description: '24/7 customer service for all your needs'
              },
              {
                icon: <ArrowRight className="text-accent" size={32} />,
                title: 'Easy Process',
                description: 'Simple ordering and customization workflow'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium gifts
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/products/${product.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Request Quote
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by businesses across industries
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex text-accent mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p>{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6">Looking for a Reliable Corporate Gifting Partner?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let us help you create lasting impressions with our premium gifting solutions
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/quote">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get a Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
