import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/modals/AuthModal';
import AdminPanel from '../components/AdminPanel';

const StorePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const isAdmin = user?.id === "2";

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Store</h1>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user.email}</span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={() => openAuthModal('login')}
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="border border-black text-black px-6 py-2 rounded-md hover:bg-black hover:text-white transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products */}
        <div className="space-y-8">
          {products.filter(p => p.category === "store").map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <AuthModal 
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        mode={authModal.mode}
      />
      {isAdmin && (
        <AdminPanel
          onAdd={async (product) => {
            try {
              const formData = new FormData();
              formData.append('name', product.name);
              formData.append('description', product.description);
              formData.append('size', product.size);
              formData.append('price', product.price.toString());
              formData.append('image', product.image);

              const res = await fetch('http://localhost:5050/api/admin/upload', {
                method: 'POST',
                headers: {
                  'x-user-id': user?.id || ''
                },
                body: formData
              });

              if (!res.ok) {
                console.error('Failed to add product');
                return;
              }

              const newProduct = await res.json();
              console.log('Yeni ürün eklendi:', newProduct);
              // Optionally update local product list here

            } catch (error) {
              console.error('Error adding product:', error);
            }
          }}
          onDelete={async (id: string) => {
            try {
              const res = await fetch(`http://localhost:5050/api/admin/delete/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'x-user-id': user?.id || ''
                }
              });

              if (!res.ok) {
                console.error('Failed to delete product');
                return;
              }

              console.log('Ürün silindi:', id);
              // Optionally update local product list here

            } catch (error) {
              console.error('Error deleting product:', error);
            }
          }}
          onUpdatePrice={async (id: string, price: number) => {
            try {
              const res = await fetch(`http://localhost:5050/api/admin/update-price/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'x-user-id': user?.id || ''
                },
                body: JSON.stringify({ price })
              });

              if (!res.ok) {
                console.error('Failed to update price');
                return;
              }

              const updatedProduct = await res.json();
              console.log('Fiyat güncellendi:', updatedProduct);
              // Optionally update local product list here

            } catch (error) {
              console.error('Error updating price:', error);
            }
          }}
        />
      )}
    </div>
  );
};

export default StorePage;
