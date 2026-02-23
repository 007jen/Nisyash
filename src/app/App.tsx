import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import ScrollToTop from './components/ScrollToTop';
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
import AdminPage from './pages/AdminPage';

import { useUser, useAuth } from '@clerk/clerk-react';

const GatewayGuard = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { isLoaded: isAuthLoaded } = useAuth();

  if (!isUserLoaded || !isAuthLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isCompletedLocal = localStorage.getItem('nishyash_gateway_v2') === 'true';
  const isCompletedMetadata = user?.unsafeMetadata?.gateway_v2_completed === true;

  if (!isCompletedLocal && !isCompletedMetadata) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default function App() {
  return (
    <QuoteProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Landing Page: Full screen, no Header/Footer */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes: Require Gateway Completion */}
          <Route element={<GatewayGuard />}>
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
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppWidget />
              </div>
            } />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </QuoteProvider>
  );
}
