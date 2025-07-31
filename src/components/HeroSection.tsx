import React from 'react';
import { useScrollEffect } from '../hooks/useScrollEffect';

const HeroSection: React.FC = () => {
  const { isScrolled } = useScrollEffect();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Black Background Section */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-1000 ${
        isScrolled ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white tracking-wider">
            ethereal
          </h1>
        </div>
      </div>

      {/* White Background Section */}
      <div className={`fixed inset-0 bg-white transition-opacity duration-1000 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-2xl md:text-3xl text-black font-light tracking-wide">
              contact Helinolgac@icloud.com
            </p>
          </div>
        </div>
      </div>

      {/* Spacer to enable scrolling */}
      <div className="h-[200vh]"></div>
    </div>
  );
};

export default HeroSection;