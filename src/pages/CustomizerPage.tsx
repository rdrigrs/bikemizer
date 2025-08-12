import React, { useState } from 'react';
import { BikeCanvas } from '@/components/bike/BikeCanvas';
import { BikeType, BikeSize } from '@/types';

export const CustomizerPage: React.FC = () => {
  const [currentColor, setCurrentColor] = useState('#ff0000');
  const [currentStickers, setCurrentStickers] = useState<Array<{ type: string; x: number; y: number; size: number }>>([]);
  const [bikeType, setBikeType] = useState<BikeType>(BikeType.ROAD);
  const [bikeSize, setBikeSize] = useState<BikeSize>(BikeSize.MEDIUM);

  const predefinedColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff', '#ffffff', '#000000'];
  const predefinedStickers = ['star', 'heart', 'bolt', 'fire', 'rocket', 'crown'];

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  };

  const handleStickerAdd = (stickerType: string) => {
    const newSticker = {
      type: stickerType,
      x: Math.random() * 500 + 50, // Posição aleatória no canvas
      y: Math.random() * 300 + 50,
      size: 30
    };
    setCurrentStickers([...currentStickers, newSticker]);
  };

  const handleReset = () => {
    setCurrentColor('#ff0000');
    setCurrentStickers([]);
    setBikeType(BikeType.ROAD);
    setBikeSize(BikeSize.MEDIUM);
  };

  const handleSave = () => {
    // Aqui você pode implementar a lógica para salvar a configuração
    console.log('Salvando bicicleta:', {
      color: currentColor,
      stickers: currentStickers,
      type: bikeType,
      size: bikeSize
    });
    alert('Bicicleta salva com sucesso! 🎉');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="section-title">Customizador de Bicicletas</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Canvas Area */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">🚴 Sua Bicicleta Personalizada</h3>
            <BikeCanvas
              color={currentColor}
              stickers={currentStickers}
              bikeType={bikeType}
              bikeSize={bikeSize}
            />
          </div>

          {/* Controls Area */}
          <div className="space-y-6">
            {/* Color Selection */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">🎨 Cores</h3>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {predefinedColors.map((color) => (
                  <div
                    key={color}
                    className={`w-12 h-12 rounded-full cursor-pointer border-2 transition-all hover:scale-110 ${
                      currentColor === color ? 'border-primary-600 scale-110' : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cor personalizada:</label>
                <input 
                  type="color" 
                  value={currentColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-10 rounded border cursor-pointer" 
                />
              </div>
            </div>

            {/* Sticker Selection */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">🏷️ Adesivos</h3>
              <div className="grid grid-cols-3 gap-3">
                {predefinedStickers.map((sticker) => (
                  <div
                    key={sticker}
                    className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-200 transition-colors hover:scale-105"
                    onClick={() => handleStickerAdd(sticker)}
                  >
                    {sticker === 'star' && '⭐'}
                    {sticker === 'heart' && '❤️'}
                    {sticker === 'bolt' && '⚡'}
                    {sticker === 'fire' && '🔥'}
                    {sticker === 'rocket' && '🚀'}
                    {sticker === 'crown' && '👑'}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Clique em um adesivo para adicioná-lo à bicicleta
              </p>
            </div>

            {/* Bike Configuration */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">⚙️ Configurações</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo:</label>
                                      <select 
                      className="input-field"
                      value={bikeType}
                      onChange={(e) => setBikeType(e.target.value as BikeType)}
                    >
                      <option value={BikeType.ROAD}>Road Bike</option>
                      <option value={BikeType.MOUNTAIN}>Mountain Bike</option>
                      <option value={BikeType.CITY}>City Bike</option>
                      <option value={BikeType.BMX}>BMX</option>
                    </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tamanho:</label>
                                      <select 
                      className="input-field"
                      value={bikeSize}
                      onChange={(e) => setBikeSize(e.target.value as BikeSize)}
                    >
                      <option value={BikeSize.SMALL}>Pequeno</option>
                      <option value={BikeSize.MEDIUM}>Médio</option>
                      <option value={BikeSize.LARGE}>Grande</option>
                    </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                className="btn-secondary flex-1"
                onClick={handleReset}
              >
                🔄 Resetar
              </button>
              <button 
                className="btn-success flex-1"
                onClick={handleSave}
              >
                💾 Salvar
              </button>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
              <p className="font-medium mb-2">💡 Dica:</p>
              <p>Experimente diferentes cores e adesivos para criar sua bicicleta única!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 