import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Personalize sua Bicicleta
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Crie uma bicicleta única com cores personalizadas e adesivos exclusivos usando nossa plataforma moderna
          </p>
          <Link 
            to="/customizer" 
            className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 inline-block"
          >
            Começar a Customizar
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Por que escolher o BikeMizer?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">Design Intuitivo</h3>
              <p className="text-gray-600">
                Interface fácil de usar para todos os níveis de experiência
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Tempo Real</h3>
              <p className="text-gray-600">
                Veja suas mudanças instantaneamente no canvas
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Arquitetura Moderna</h3>
              <p className="text-gray-600">
                Construído com React, TypeScript e princípios SOLID
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Junte-se à comunidade de ciclistas criativos
          </p>
          <div className="space-x-4">
            <Link 
              to="/customizer" 
              className="btn-primary inline-block"
            >
              Criar Bicicleta
            </Link>
            <Link 
              to="/gallery" 
              className="btn-secondary inline-block"
            >
              Ver Galeria
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}; 