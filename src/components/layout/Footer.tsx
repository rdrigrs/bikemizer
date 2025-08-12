import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-2">🚴 BikeMizer</p>
        <p className="text-gray-300 mb-4">Transformando bicicletas em obras de arte</p>
        <div className="text-sm text-gray-400">
          © 2024 BikeMizer. Desenvolvido com ❤️ seguindo princípios SOLID.
        </div>
      </div>
    </footer>
  );
}; 