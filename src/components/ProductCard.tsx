import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showPrice = false }) => {
  const [imageClicked, setImageClicked] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleImageClick = () => {
    if (!showPrice) {
      setImageClicked(true);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="md:w-1/2">
        <img
          src={`http://localhost:5050/${product.image}`}
          alt={product.name}
          className="w-full h-64 md:h-80 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleImageClick}
        />
      </div>
      
      <div className="md:w-1/2 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 font-medium">Size: {product.size}</p>
        <p className="text-gray-700 leading-relaxed">{product.story}</p>
        
        {(showPrice || imageClicked) && (
          <div className="space-y-4 pt-4 border-t">
            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              Add to Cart
            </button>
          </div>
        )}

        {user?.id === '2' && (
          <div className="flex space-x-2 mt-2">
            <button
              onClick={async () => {
                await fetch(`http://localhost:5050/api/products/${product.id}`, {
                  method: 'DELETE',
                  headers: { 'x-user-id': user.id?.toString() }
                });
                window.location.reload();
              }}
              className="text-red-600 hover:underline"
            >
              Sil
            </button>

            <button
              onClick={async () => {
                const yeniFiyat = prompt("Yeni fiyat girin:", product.price.toString());
                if (!yeniFiyat) return;
                await fetch(`http://localhost:5050/api/products/${product.id}/price`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id?.toString()
                  },
                  body: JSON.stringify({ price: parseFloat(yeniFiyat) })
                });
                window.location.reload();
              }}
              className="text-blue-600 hover:underline"
            >
              Fiyatı Güncelle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
