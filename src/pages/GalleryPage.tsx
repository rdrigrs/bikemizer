import React from 'react';

export const GalleryPage: React.FC = () => {
  // Dados de exemplo para a galeria
  const sampleBikes = [
    {
      id: '1',
      name: 'Bicicleta Road Vermelha',
      color: '#ff0000',
      type: 'road',
      stickers: 2,
      image: '🚴‍♂️'
    },
    {
      id: '2',
      name: 'Bicicleta Mountain Azul',
      color: '#0000ff',
      type: 'mountain',
      stickers: 1,
      image: '🚴‍♀️'
    },
    {
      id: '3',
      name: 'Bicicleta City Verde',
      color: '#00ff00',
      type: 'city',
      stickers: 3,
      image: '🚴'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="section-title">Galeria de Criações</h1>
        
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <select className="input-field w-auto">
              <option value="">Todos os tipos</option>
              <option value="road">Road Bike</option>
              <option value="mountain">Mountain Bike</option>
              <option value="city">City Bike</option>
              <option value="bmx">BMX</option>
            </select>
            
            <select className="input-field w-auto">
              <option value="">Todos os tamanhos</option>
              <option value="small">Pequeno</option>
              <option value="medium">Médio</option>
              <option value="large">Grande</option>
            </select>
            
            <input 
              type="text" 
              placeholder="Buscar por nome..." 
              className="input-field w-auto"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleBikes.map((bike) => (
            <div key={bike.id} className="card hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{bike.image}</div>
                <div 
                  className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300"
                  style={{ backgroundColor: bike.color }}
                />
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{bike.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>Tipo: {bike.type}</p>
                <p>Cor: {bike.color}</p>
                <p>Adesivos: {bike.stickers}</p>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="btn-primary flex-1 text-sm">Editar</button>
                <button className="btn-secondary flex-1 text-sm">Compartilhar</button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sampleBikes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Nenhuma criação encontrada</h3>
            <p className="text-gray-600 mb-4">
              Comece criando sua primeira bicicleta personalizada
            </p>
            <button className="btn-primary">Criar Bicicleta</button>
          </div>
        )}
      </div>
    </div>
  );
}; 