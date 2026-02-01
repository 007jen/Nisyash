import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home, Search } from 'lucide-react';
import { motion } from 'motion/react';

export function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center max-w-lg mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative mb-8">
                        <h1 className="text-9xl font-bold text-muted/20 select-none">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-medium text-accent">Page Not Found</span>
                        </div>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-muted-foreground mb-8 text-lg"
                >
                    Oops! The page you are looking for keeps finding new ways to hide.
                    It might have been moved or deleted.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/home">
                        <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                            <Home size={18} />
                            Back to Home
                        </Button>
                    </Link>
                    <Link to="/products">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                            <Search size={18} />
                            Browse Products
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
