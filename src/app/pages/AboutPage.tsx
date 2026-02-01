import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, TrendingUp, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'motion/react';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl mb-6">About Nishyash Corporation</h1>
            <p className="text-xl text-primary-foreground/90">
              Your trusted partner in creating meaningful corporate and personalised gifting experiences that leave lasting impressions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Founded with a vision to revolutionize corporate gifting, Nishyash Corporation has grown into a trusted name in the industry. We understand that gifts are more than just products – they're expressions of appreciation, recognition, and connection.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our journey began with a simple belief: every gift should tell a story and create a lasting impression. Today, we serve hundreds of businesses across industries, helping them strengthen relationships through thoughtfully curated gifts.
              </p>
              <p className="text-lg text-muted-foreground">
                With a commitment to quality, customization, and timely delivery, we've become the go-to partner for organizations seeking premium gifting solutions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1496180470114-6ef490f3ff22"
                alt="Our Team"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Award className="text-accent" size={32} />,
                title: 'Quality First',
                description: 'We never compromise on the quality of our products and services'
              },
              {
                icon: <Heart className="text-accent" size={32} />,
                title: 'Customer Focus',
                description: 'Your satisfaction and success are at the heart of what we do'
              },
              {
                icon: <TrendingUp className="text-accent" size={32} />,
                title: 'Innovation',
                description: 'Constantly evolving to bring you the latest gifting trends'
              },
              {
                icon: <CheckCircle className="text-accent" size={32} />,
                title: 'Reliability',
                description: 'Delivering on our promises, every single time'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Why Businesses Trust Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What sets us apart in the corporate gifting industry
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '1000+',
                label: 'Happy Clients',
                description: 'Businesses across industries trust us'
              },
              {
                number: '10000+',
                label: 'Orders Delivered',
                description: 'Successfully completed projects'
              },
              {
                number: '99%',
                label: 'On-Time Delivery',
                description: 'Meeting deadlines consistently'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardContent className="p-8">
                    <div className="text-5xl text-accent mb-2">{stat.number}</div>
                    <h3 className="mb-2">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive gifting solutions for all your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Wide range of premium products',
              'Custom branding and personalization',
              'Bulk order discounts',
              'Dedicated account management',
              'Quick turnaround times',
              'Quality assurance guarantee',
              'Flexible payment options',
              'Pan-India delivery network'
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="text-accent flex-shrink-0" size={24} />
                <span className="text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6">Ready to Partner With Us?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's create memorable gifting experiences together
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
