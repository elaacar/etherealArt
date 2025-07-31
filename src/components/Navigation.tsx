import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useScrollEffect } from '../hooks/useScrollEffect';
import { useCart } from '../hooks/useCart';
import AdminModal from './modals/AdminModal';
import CartModal from './modals/CartModal';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const { isScrolled } = useScrollEffect();
  const { items } = useCart();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Store', id: 'store' },
    { name: 'Contact', id: 'contact' },
    { name: 'References', id: 'references' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className={`text-2xl font-bold cursor-pointer transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              onClick={() => onPageChange('home')}
            >
              ethereal
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`transition-colors duration-300 hover:opacity-70 ${
                    currentPage === item.id 
                      ? (isScrolled ? 'text-gray-900 font-semibold' : 'text-white font-semibold')
                      : (isScrolled ? 'text-gray-700' : 'text-gray-300')
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button
                onClick={() => setIsCartModalOpen(true)}
                className={`relative p-2 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-black' : 'text-white hover:text-gray-300'
                }`}
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Admin */}
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className={`transition-colors duration-300 hover:opacity-70 ${
                  isScrolled ? 'text-gray-700' : 'text-gray-300'
                }`}
              >
                Admin
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md ${
                    currentPage === item.id ? 'font-semibold' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <AdminModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
      
      <CartModal 
        isOpen={isCartModalOpen} 
        onClose={() => setIsCartModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;