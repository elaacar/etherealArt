import React from 'react';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';

const ReferencesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">References</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the stories behind each creation. Every piece in this collection represents a journey 
            of artistic exploration, where digital techniques meet creative vision to produce works that 
            resonate with the soul.
          </p>
        </div>

        <div className="space-y-12">
          {products.filter(p => p.category === "reference").map((product, index) => (
            <div 
              key={product.id}
              className={`opacity-0 animate-fadeIn delay-${Math.min(index, 10)}`}
            >
              <ProductCard product={product} showPrice={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferencesPage;