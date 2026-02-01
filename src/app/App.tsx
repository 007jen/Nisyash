import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
import { QuoteProvider } from './context/QuoteContext';
import { NotFoundPage } from './pages/NotFoundPage';
import { Toaster } from './components/ui/sonner';

import { ProductsPage } from './pages/ProductsPage';
import { LandingPage } from './pages/LandingPage';

export default function App() {
  return (
    <QuoteProvider>
      <Router>
        <Routes>
          {/* Landing Page: Full screen, no Header/Footer */}
          <Route path="/" element={<LandingPage />} />

          {/* All other pages: with Header/Footer */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/categories/:categoryId" element={<CategoryPage />} />
                  <Route path="/products/:productId" element={<ProductPage />} />
                  <Route path="/quote" element={<QuotePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppWidget />
            </div>
          } />
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </QuoteProvider>
  );
}
