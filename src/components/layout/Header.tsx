import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <span className="text-3xl">🚴</span>
            <span>BikeMizer</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-secondary-300 transition-colors">
              Home
            </Link>
            <Link to="/customizer" className="hover:text-secondary-300 transition-colors">
              Customizar
            </Link>
            <Link to="/gallery" className="hover:text-secondary-300 transition-colors">
              Galeria
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}; 