import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowRight } from 'lucide-react';

export function ProductsPage() {
    return (
        <div className="pt-28 pb-20 min-h-screen bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Our Complete Collection</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover our comprehensive range of corporate and personalized gifting solutions, thoughtfully curated for every occasion.
                    </p>
                </div>

                <div className="space-y-20">
                    {categories.map((category) => {
                        const categoryProducts = products.filter(p => p.category === category.id);

                        // Even if no products are hardcoded, we should show the category so users know it exists
                        // But if empty, maybe show a "Coming Soon" or skip? 
                        // Let's skip if empty to be clean, or show a placeholder. 
                        // Given the demo data, let's just skip empty ones to avoid clutter.
                        if (categoryProducts.length === 0) return null;

                        return (
                            <section key={category.id} id={category.id} className="scroll-mt-28">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-border/50 pb-4">
                                    <div>
                                        <h2 className="text-3xl font-bold text-primary mb-2">{category.name}</h2>
                                        <p className="text-muted-foreground">{category.description}</p>
                                    </div>
                                    <Link to={`/categories/${category.id}`}>
                                        <Button variant="outline" className="group">
                                            View All {category.name}
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {categoryProducts.map((product) => (
                                        <Link key={product.id} to={`/products/${product.id}`} className="group block h-full">
                                            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card hover:border-primary/20">
                                                <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    {product.customizable && (
                                                        <Badge className="absolute top-3 right-3 bg-white/90 text-primary hover:bg-white backdrop-blur-sm shadow-sm">
                                                            Customizable
                                                        </Badge>
                                                    )}
                                                </div>
                                                <CardContent className="p-5">
                                                    <div className="mb-3 flex flex-wrap gap-2">
                                                        {product.tags.slice(0, 2).map((tag) => (
                                                            <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                                                        {product.description}
                                                    </p>
                                                    <Button variant="ghost" size="sm" className="w-full justify-between items-center group/btn hover:bg-primary hover:text-primary-foreground">
                                                        View Details
                                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
