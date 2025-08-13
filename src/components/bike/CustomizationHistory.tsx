import React, { useState } from 'react';
import { CustomizationHistory as HistoryType, BikeConfiguration } from '@/types';
import { BikeCanvas } from './BikeCanvas';
import { useCustomizationHistory } from '@/hooks/useCustomizationHistory';
import { Clock, Star, Trash2, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface CustomizationHistoryProps {
  bikeId: string;
  onRestore?: (configuration: BikeConfiguration) => void;
}

export const CustomizationHistory: React.FC<CustomizationHistoryProps> = ({
  bikeId,
  onRestore
}) => {
  const { 
    bikeHistory, 
    deleteVersion, 
    toggleVersionFavorite,
    compareVersions 
  } = useCustomizationHistory(bikeId);
  
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleVersionSelect = (historyId: string) => {
    setSelectedVersions(prev => 
      prev.includes(historyId) 
        ? prev.filter(id => id !== historyId)
        : prev.length < 2 
          ? [...prev, historyId]
          : [prev[1], historyId]
    );
  };

  const handleRestore = (configuration: BikeConfiguration) => {
    if (onRestore) {
      onRestore(configuration);
    }
  };

  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      setShowComparison(true);
    }
  };

  const getSelectedHistory = () => {
    return selectedVersions.map(id => 
      bikeHistory.find(h => h.id === id)
    ).filter(Boolean) as HistoryType[];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (bikeHistory.length === 0) {
    return (
      <div className="card text-center py-8">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma versão salva</h3>
        <p className="text-gray-500">Comece a customizar sua bicicleta para ver o histórico aqui!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com controles */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">📚 Histórico de Versões</h3>
        <div className="flex space-x-2">
          {selectedVersions.length === 2 && (
            <button
              onClick={handleCompare}
              className="btn-primary text-sm px-3 py-2"
            >
              🔍 Comparar
            </button>
          )}
          <button
            onClick={() => setSelectedVersions([])}
            className="btn-secondary text-sm px-3 py-2"
            disabled={selectedVersions.length === 0}
          >
            Limpar Seleção
          </button>
        </div>
      </div>

      {/* Lista de versões */}
      <div className="grid gap-4">
        {bikeHistory.map((history) => {
          const isSelected = selectedVersions.includes(history.id);
          const canSelect = selectedVersions.length < 2 || isSelected;
          
          return (
            <div
              key={history.id}
              className={`card transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-primary-500 bg-primary-50' 
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Canvas da versão */}
                <div className="flex-shrink-0">
                  <BikeCanvas
                    color={history.configuration.color}
                    stickers={history.configuration.stickers.map(s => ({
                      type: s.type,
                      x: s.position.x,
                      y: s.position.y,
                      size: s.size
                    }))}
                    bikeType={history.configuration.type}
                    bikeSize={history.configuration.size}
                    showLabels={true}
                    className="w-32 h-24"
                  />
                </div>

                {/* Informações da versão */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-medium">
                      Versão {history.version}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleVersionFavorite(history.id)}
                        className={`p-1 rounded-full transition-colors ${
                          history.isFavorite 
                            ? 'text-yellow-500 hover:text-yellow-600' 
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className="w-4 h-4" fill={history.isFavorite ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => deleteVersion(history.id)}
                        className="p-1 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Tipo:</span> {history.configuration.type}
                    </div>
                    <div>
                      <span className="font-medium">Tamanho:</span> {history.configuration.size}
                    </div>
                    <div>
                      <span className="font-medium">Cor:</span> 
                      <span 
                        className="inline-block w-4 h-4 rounded-full ml-2 border border-gray-300"
                        style={{ backgroundColor: history.configuration.color }}
                      />
                    </div>
                    <div>
                      <span className="font-medium">Adesivos:</span> {history.configuration.stickers.length}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    {formatDate(history.timestamp)}
                  </div>

                  {history.description && (
                    <p className="text-sm text-gray-700 mb-3">
                      {history.description}
                    </p>
                  )}

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRestore(history.configuration)}
                      className="btn-primary text-sm px-3 py-1"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Restaurar
                    </button>
                    
                    <button
                      onClick={() => handleVersionSelect(history.id)}
                      disabled={!canSelect}
                      className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-primary-100 text-primary-700'
                          : canSelect
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isSelected ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                      {isSelected ? 'Desselecionar' : 'Selecionar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de comparação */}
      {showComparison && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">🔍 Comparação de Versões</h3>
              <button
                onClick={() => setShowComparison(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {getSelectedHistory().map((history) => (
                <div key={history.id} className="text-center">
                  <h4 className="text-lg font-semibold mb-4">
                    Versão {history.version}
                  </h4>
                  <BikeCanvas
                    color={history.configuration.color}
                    stickers={history.configuration.stickers.map(s => ({
                      type: s.type,
                      x: s.position.x,
                      y: s.position.y,
                      size: s.size
                    }))}
                    bikeType={history.configuration.type}
                    bikeSize={history.configuration.size}
                    showGrid={true}
                    showLabels={true}
                    className="mb-4"
                  />
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Tipo:</strong> {history.configuration.type}</p>
                    <p><strong>Tamanho:</strong> {history.configuration.size}</p>
                    <p><strong>Cor:</strong> {history.configuration.color}</p>
                    <p><strong>Adesivos:</strong> {history.configuration.stickers.length}</p>
                    <p><strong>Data:</strong> {formatDate(history.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Lista de diferenças */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-3">📋 Resumo das Diferenças</h4>
              <div className="space-y-2">
                {(() => {
                  const selectedHistory = getSelectedHistory();
                  if (selectedHistory.length === 2) {
                    const differences = compareVersions(selectedHistory[0], selectedHistory[1]);
                    return differences.map((diff, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          diff.changeType === 'added' ? 'bg-green-100 text-green-800' :
                          diff.changeType === 'removed' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {diff.changeType === 'added' ? '➕' : 
                           diff.changeType === 'removed' ? '➖' : '🔄'}
                        </span>
                        <span className="font-medium">{diff.field}:</span>
                        <span className="text-gray-600">
                          {diff.changeType === 'removed' 
                            ? `${diff.oldValue} → removido`
                            : diff.changeType === 'added'
                              ? `adicionado → ${diff.newValue}`
                              : `${diff.oldValue} → ${diff.newValue}`
                          }
                        </span>
                      </div>
                    ));
                  }
                  return null;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
