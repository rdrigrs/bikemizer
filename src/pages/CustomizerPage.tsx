import React, { useState } from 'react';
import { BikeCanvas } from '@/components/bike/BikeCanvas';
import { CustomizationHistory } from '@/components/bike/CustomizationHistory';
import { CustomizationStats } from '@/components/bike/CustomizationStats';
import { useCustomizationHistory } from '@/hooks/useCustomizationHistory';
import { BikeType, BikeSize, BikeConfiguration } from '@/types';
import { Save, History, RotateCcw, BarChart3 } from 'lucide-react';

export const CustomizerPage: React.FC = () => {
  const { saveVersion } = useCustomizationHistory('default');
  const [currentColor, setCurrentColor] = useState('#ff0000');
  const [currentStickers, setCurrentStickers] = useState<Array<{ type: string; x: number; y: number; size: number }>>([]);
  const [bikeType, setBikeType] = useState<BikeType>(BikeType.ROAD);
  const [bikeSize, setBikeSize] = useState<BikeSize>(BikeSize.MEDIUM);
  const [showHistory, setShowHistory] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [saveDescription, setSaveDescription] = useState('');

  const predefinedColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff', '#ffffff', '#000000'];
  const predefinedStickers = ['star', 'heart', 'bolt', 'fire', 'rocket', 'crown'];

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  };

  const handleStickerAdd = (stickerType: string) => {
    const newSticker = {
      type: stickerType,
      x: Math.random() * 500 + 50,
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
    const configuration: BikeConfiguration = {
      type: bikeType,
      size: bikeSize,
      color: currentColor,
      stickers: currentStickers.map(s => ({
        id: `sticker_${Date.now()}_${Math.random()}`,
        type: s.type as any,
        position: { x: s.x, y: s.y },
        size: s.size
      }))
    };

    saveVersion(configuration, saveDescription || undefined);
    setSaveDescription('');
    
    // Feedback visual
    const saveButton = document.querySelector('[data-save-button]') as HTMLButtonElement;
    if (saveButton) {
      saveButton.textContent = '✅ Salvo!';
      setTimeout(() => {
        saveButton.textContent = '💾 Salvar Versão';
      }, 2000);
    }
  };

  const handleRestore = (configuration: BikeConfiguration) => {
    setCurrentColor(configuration.color);
    setCurrentStickers(configuration.stickers.map(s => ({
      type: s.type,
      x: s.position.x,
      y: s.position.y,
      size: s.size
    })));
    setBikeType(configuration.type);
    setBikeSize(configuration.size);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="section-title mb-0">Customizador de Bicicletas</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowStats(!showStats)}
              className={`btn-secondary flex items-center space-x-2 ${
                showStats ? 'bg-accent-600 text-white' : ''
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{showStats ? 'Ocultar' : 'Mostrar'} Estatísticas</span>
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`btn-secondary flex items-center space-x-2 ${
                showHistory ? 'bg-primary-600 text-white' : ''
              }`}
            >
              <History className="w-4 h-4" />
              <span>{showHistory ? 'Ocultar' : 'Mostrar'} Histórico</span>
            </button>
          </div>
        </div>
        
        {showStats ? (
          <CustomizationStats bikeId="default" />
        ) : showHistory ? (
          <CustomizationHistory
            bikeId="default"
            onRestore={handleRestore}
          />
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Canvas Area */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">🚴 Sua Bicicleta Personalizada</h3>
              <BikeCanvas
                color={currentColor}
                stickers={currentStickers}
                bikeType={bikeType}
                bikeSize={bikeSize}
                showLabels={true}
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

              {/* Save Configuration */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">💾 Salvar Versão</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Descrição (opcional):</label>
                    <input
                      type="text"
                      placeholder="Ex: Versão com cor azul e adesivos"
                      value={saveDescription}
                      onChange={(e) => setSaveDescription(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <button 
                    data-save-button
                    className="btn-success w-full flex items-center justify-center space-x-2"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4" />
                    <span>💾 Salvar Versão</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>🔄 Resetar</span>
                </button>
              </div>

              {/* Info */}
              <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                <p className="font-medium mb-2">💡 Dica:</p>
                <p>Salve suas versões favoritas para comparar e restaurar depois! Use o botão "Mostrar Histórico" para ver todas as versões salvas.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 