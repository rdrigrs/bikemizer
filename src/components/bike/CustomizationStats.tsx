import React from 'react';
import { useCustomizationHistory } from '@/hooks/useCustomizationHistory';
import { TrendingUp, Palette, Star, Clock, Zap, Bike } from 'lucide-react';

interface CustomizationStatsProps {
  bikeId: string;
}

export const CustomizationStats: React.FC<CustomizationStatsProps> = ({ bikeId }) => {
  const { getVersionStats, hasHistory } = useCustomizationHistory(bikeId);
  
  if (!hasHistory) {
    return null;
  }

  const stats = getVersionStats();
  if (!stats) return null;

  const daysSinceLastEdit = stats.lastModified 
    ? Math.floor((Date.now() - new Date(stats.lastModified).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const statCards = [
    {
      label: 'Total de Versões',
      value: stats.totalVersions,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Versões Favoritas',
      value: stats.favoriteCount,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Cores Únicas',
      value: stats.uniqueColors,
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Média de Adesivos',
      value: stats.averageStickers.toFixed(1),
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">📊 Estatísticas de Customização</h3>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} p-4 rounded-lg text-center`}>
            <div className={`${stat.color} mb-2`}>
              <stat.icon className="w-6 h-6 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Informações detalhadas */}
      <div className="space-y-4">
        {/* Cor mais popular */}
        {stats.mostPopularColor && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Cor mais popular:</span>
            <div className="flex items-center space-x-2">
              <span 
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: stats.mostPopularColor[0] }}
              />
              <span className="text-sm text-gray-600">
                {stats.mostPopularColor[1]} versões
              </span>
            </div>
          </div>
        )}

        {/* Tipo mais popular */}
        {stats.mostPopularType && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Tipo mais popular:</span>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Bike className="w-4 h-4" />
              <span className="capitalize">
                {stats.mostPopularType[0]} ({stats.mostPopularType[1]} versões)
              </span>
            </div>
          </div>
        )}

        {/* Última edição */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Última edição:</span>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              {daysSinceLastEdit === 0 
                ? 'Hoje' 
                : daysSinceLastEdit === 1 
                  ? 'Ontem' 
                  : `${daysSinceLastEdit} dias atrás`
              }
            </span>
          </div>
        </div>

        {/* Progresso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Progresso de versões</span>
            <span className="text-gray-600">{stats.totalVersions} / 10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((stats.totalVersions / 10) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">
            {stats.totalVersions < 5 
              ? 'Continue criando versões para desbloquear mais recursos!' 
              : stats.totalVersions < 10 
                ? 'Você está no caminho certo! Crie mais versões para completar.' 
                : 'Parabéns! Você completou todas as versões! 🎉'
            }
          </p>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">💡 Insights</h4>
          <div className="space-y-1 text-sm text-blue-800">
            {stats.averageStickers > 3 && (
              <p>• Você gosta de adesivos! Média de {stats.averageStickers.toFixed(1)} por versão</p>
            )}
            {stats.uniqueColors > 5 && (
              <p>• Você experimenta muitas cores diferentes ({stats.uniqueColors} únicas)</p>
            )}
            {stats.favoriteCount > stats.totalVersions * 0.5 && (
              <p>• Você marca muitas versões como favoritas - ótimo gosto!</p>
            )}
            {stats.totalVersions > 7 && (
              <p>• Você é um customizador experiente com {stats.totalVersions} versões!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
