import React, { useState } from 'react';
import { BikeCanvas } from '@/components/bike/BikeCanvas';
import { CustomizationHistory } from '@/components/bike/CustomizationHistory';
import { CustomizationStats } from '@/components/bike/CustomizationStats';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useCustomizationHistory } from '@/hooks/useCustomizationHistory';
import { useToast } from '@/hooks/useToast';
import { BikeType, BikeSize, BikeConfiguration } from '@/types';
import { Save, History, RotateCcw, BarChart3 } from 'lucide-react';

export const CustomizerPage: React.FC = () => {
  const { saveVersion } = useCustomizationHistory('default');
  const { success, error } = useToast();
  const [currentColor, setCurrentColor] = useState('#ff0000');
  const [currentStickers, setCurrentStickers] = useState<Array<{ type: string; x: number; y: number; size: number }>>([]);
  const [bikeType, setBikeType] = useState<BikeType>(BikeType.ROAD);
  const [bikeSize, setBikeSize] = useState<BikeSize>(BikeSize.MEDIUM);
  const [showHistory, setShowHistory] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [saveDescription, setSaveDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
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

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      saveVersion(configuration, saveDescription || undefined);
      setSaveDescription('');
      
      success(
        'Versão salva com sucesso!', 
        'Sua configuração foi salva no histórico.',
        3000
      );
    } catch (err) {
      error(
        'Erro ao salvar', 
        'Não foi possível salvar a configuração. Tente novamente.',
        5000
      );
    } finally {
      setIsSaving(false);
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
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Canvas Area */}
            <div className="card lg:col-span-1 xl:col-span-2">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">🚴 Sua Bicicleta Personalizada</h3>
              <div className="relative">
                <BikeCanvas
                  color={currentColor}
                  stickers={currentStickers}
                  bikeType={bikeType}
                  bikeSize={bikeSize}
                  showLabels={true}
                  className="w-full"
                />
                {/* Overlay com informações */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">Tipo: {bikeType}</div>
                    <div className="font-medium">Tamanho: {bikeSize}</div>
                    <div className="font-medium">Cor: {currentColor}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Area */}
            <div className="space-y-6 lg:col-span-1">
              {/* Color Selection */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6 text-gray-800">🎨 Cores</h3>
                <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-3 mb-6">
                  {predefinedColors.map((color) => (
                    <div
                      key={color}
                      className={`color-picker ${
                        currentColor === color ? 'border-primary-600 scale-110 shadow-lg' : 'border-gray-300 hover:border-primary-400'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">Cor personalizada:</label>
                  <input 
                    type="color" 
                    value={currentColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-gray-300 cursor-pointer hover:border-primary-400 transition-colors" 
                  />
                </div>
              </div>

              {/* Sticker Selection */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6 text-gray-800">🏷️ Adesivos</h3>
                <div className="grid grid-cols-3 gap-4">
                  {predefinedStickers.map((sticker) => (
                    <div
                      key={sticker}
                      className="sticker-button"
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
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Clique em um adesivo para adicioná-lo à bicicleta
                </p>
              </div>

              {/* Bike Configuration */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6 text-gray-800">⚙️ Configurações</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700">Tipo:</label>
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
                    <label className="block text-sm font-medium mb-3 text-gray-700">Tamanho:</label>
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
                <h3 className="text-xl font-bold mb-6 text-gray-800">💾 Salvar Versão</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700">Descrição (opcional):</label>
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
                    className="btn-success w-full flex items-center justify-center space-x-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Salvando...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>💾 Salvar Versão</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  className="btn-secondary flex-1 flex items-center justify-center space-x-2 py-4"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>🔄 Resetar</span>
                </button>
              </div>

              {/* Info */}
              <div className="text-sm text-gray-700 bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl border border-primary-200">
                <p className="font-semibold mb-3 text-primary-800">💡 Dica:</p>
                <p className="leading-relaxed">Salve suas versões favoritas para comparar e restaurar depois! Use o botão "Mostrar Histórico" para ver todas as versões salvas.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 