import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, MessageCircle, ShoppingBag, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import { useQuote } from '../context/QuoteContext';
import { motion } from 'motion/react';

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id === productId);
  const { addToQuote } = useQuote();
  const [quantity, setQuantity] = useState(50);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl mb-4">Product Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const customizationOptions = [
    'Logo Printing',
    'Custom Colors',
    'Personalized Packaging',
    'Custom Messages',
    'Bulk Discounts Available'
  ];

  const useCases = [
    'Corporate Events',
    'Client Appreciation',
    'Employee Recognition',
    'Festive Celebrations',
    'Product Launches',
    'Trade Shows & Exhibitions'
  ];

  const handleWhatsApp = () => {
    const phoneNumber = '911234567890';
    const message = encodeURIComponent(
      `Hi, I'm interested in ${product.name}. Can you provide more information?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-xl"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="mr-2">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

            {/* Customization Options */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="mb-4">Customization Options</h3>
                <div className="space-y-2">
                  {customizationOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <CheckCircle className="text-accent" size={20} />
                      <span className="text-sm">{option}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity and CTA Buttons */}
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    className="p-2 hover:bg-muted"
                    onClick={() => setQuantity(Math.max(50, quantity - 10))}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    className="w-20 text-center border-none focus:ring-0 p-1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="50"
                  />
                  <button
                    className="p-2 hover:bg-muted"
                    onClick={() => setQuantity(quantity + 10)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                  onClick={() => addToQuote(product, quantity)}
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Add to Quote
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="mr-2" size={20} />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground mb-1">Minimum Order</p>
                <p>50 units</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground mb-1">Delivery Time</p>
                <p>7-14 days</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl mb-6">Perfect For</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {useCases.map((useCase) => (
                  <div
                    key={useCase}
                    className="flex items-center space-x-2 p-3 bg-muted rounded-lg"
                  >
                    <CheckCircle className="text-accent flex-shrink-0" size={20} />
                    <span className="text-sm">{useCase}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl mb-8">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="mb-2 line-clamp-1">{relatedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </motion.div>
      </div >
    </div >
  );
}
