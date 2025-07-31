import { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import StorePage from './pages/StorePage';
import ContactPage from './pages/ContactPage';
import ReferencesPage from './pages/ReferencesPage';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import StripeButton from './components/StripeButton';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'store':
        return (
          <div>
            <StorePage />
          </div>
        );
      case 'contact':
        return <ContactPage />;
      case 'references':
        return <ReferencesPage />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
          {renderPage()}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
