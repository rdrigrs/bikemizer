import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-8 animate-fade-in leading-tight">
            Personalize sua <span className="text-secondary-400">Bicicleta</span>
          </h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Crie uma bicicleta única com cores personalizadas e adesivos exclusivos usando nossa plataforma moderna e intuitiva
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/customizer" 
              className="btn-primary text-lg px-10 py-4 animate-bounce-in"
            >
              🚀 Começar a Customizar
            </Link>
            <Link 
              to="/gallery" 
              className="btn-secondary text-lg px-10 py-4 animate-bounce-in"
              style={{ animationDelay: '0.2s' }}
            >
              🖼️ Ver Galeria
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-secondary-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-accent-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Por que escolher o BikeMizer?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card animate-slide-up">
              <div className="text-6xl mb-6">🎨</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Design Intuitivo</h3>
              <p className="text-gray-600 leading-relaxed">
                Interface moderna e fácil de usar para todos os níveis de experiência, com feedback visual em tempo real
              </p>
            </div>
            
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Tempo Real</h3>
              <p className="text-gray-600 leading-relaxed">
                Veja suas mudanças instantaneamente no canvas com renderização otimizada e animações suaves
              </p>
            </div>
            
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Arquitetura Moderna</h3>
              <p className="text-gray-600 leading-relaxed">
                Construído com React, TypeScript e princípios SOLID para máxima performance e manutenibilidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-primary-200">Bicicletas Criadas</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-200">Cores Disponíveis</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-primary-200">Adesivos Únicos</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-primary-200">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Pronto para começar?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Junte-se à comunidade de ciclistas criativos e crie sua bicicleta dos sonhos
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/customizer" 
              className="btn-primary text-lg px-12 py-4 transform hover:scale-110"
            >
              🎨 Criar Bicicleta
            </Link>
            <Link 
              to="/gallery" 
              className="btn-secondary text-lg px-12 py-4 transform hover:scale-110"
            >
              📸 Ver Galeria
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}; 