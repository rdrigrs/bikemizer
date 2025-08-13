import { useCallback, useMemo } from 'react';
import { useBikeStore } from '@/stores/bikeStore';
import { CustomizationHistory, BikeConfiguration, CustomizationDifference } from '@/types';

export const useCustomizationHistory = (bikeId: string) => {
  const { 
    addToHistory, 
    removeFromHistory, 
    toggleFavorite,
    getHistoryForBike 
  } = useBikeStore();

  const bikeHistory = useMemo(() => 
    getHistoryForBike(bikeId), 
    [getHistoryForBike, bikeId]
  );

  const latestVersion = useMemo(() => 
    bikeHistory.length > 0 ? bikeHistory[0] : null, 
    [bikeHistory]
  );

  const favoriteVersions = useMemo(() => 
    bikeHistory.filter(h => h.isFavorite), 
    [bikeHistory]
  );

  const saveVersion = useCallback((
    configuration: BikeConfiguration, 
    description?: string
  ) => {
    addToHistory(configuration, description);
  }, [addToHistory]);

  const deleteVersion = useCallback((historyId: string) => {
    removeFromHistory(historyId);
  }, [removeFromHistory]);

  const toggleVersionFavorite = useCallback((historyId: string) => {
    toggleFavorite(historyId);
  }, [toggleFavorite]);

  const compareVersions = useCallback((
    version1: CustomizationHistory, 
    version2: CustomizationHistory
  ): CustomizationDifference[] => {
    const differences: CustomizationDifference[] = [];

    // Comparar cor
    if (version1.configuration.color !== version2.configuration.color) {
      differences.push({
        field: 'color',
        oldValue: version1.configuration.color,
        newValue: version2.configuration.color,
        changeType: 'modified'
      });
    }

    // Comparar tipo
    if (version1.configuration.type !== version2.configuration.type) {
      differences.push({
        field: 'type',
        oldValue: version1.configuration.type,
        newValue: version2.configuration.type,
        changeType: 'modified'
      });
    }

    // Comparar tamanho
    if (version1.configuration.size !== version2.configuration.size) {
      differences.push({
        field: 'size',
        oldValue: version1.configuration.size,
        newValue: version2.configuration.size,
        changeType: 'modified'
      });
    }

    // Comparar adesivos
    const stickers1 = version1.configuration.stickers;
    const stickers2 = version2.configuration.stickers;

    // Adesivos removidos
    stickers1.forEach(sticker1 => {
      const exists = stickers2.some(sticker2 => 
        sticker2.type === sticker1.type && 
        sticker2.position.x === sticker1.position.x && 
        sticker2.position.y === sticker1.position.y
      );
      if (!exists) {
        differences.push({
          field: 'stickers',
          oldValue: sticker1,
          newValue: null,
          changeType: 'removed'
        });
      }
    });

    // Adesivos adicionados
    stickers2.forEach(sticker2 => {
      const exists = stickers1.some(sticker1 => 
        sticker1.type === sticker2.type && 
        sticker1.position.x === sticker2.position.x && 
        sticker1.position.y === sticker2.position.y
      );
      if (!exists) {
        differences.push({
          field: 'stickers',
          oldValue: null,
          newValue: sticker2,
          changeType: 'added'
        });
      }
    });

    return differences;
  }, []);

  const getVersionStats = useCallback(() => {
    if (bikeHistory.length === 0) return null;

    const totalVersions = bikeHistory.length;
    const favoriteCount = favoriteVersions.length;
    const uniqueColors = new Set(bikeHistory.map(h => h.configuration.color)).size;
    const totalStickers = bikeHistory.reduce((sum, h) => sum + h.configuration.stickers.length, 0);
    const averageStickers = totalStickers / totalVersions;

    // Cores mais populares
    const colorCounts = bikeHistory.reduce((acc, h) => {
      acc[h.configuration.color] = (acc[h.configuration.color] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostPopularColor = Object.entries(colorCounts)
      .sort(([,a], [,b]) => b - a)[0];

    // Tipos mais populares
    const typeCounts = bikeHistory.reduce((acc, h) => {
      acc[h.configuration.type] = (acc[h.configuration.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostPopularType = Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      totalVersions,
      favoriteCount,
      uniqueColors,
      totalStickers,
      averageStickers,
      mostPopularColor,
      mostPopularType,
      lastModified: latestVersion?.timestamp
    };
  }, [bikeHistory, favoriteVersions, latestVersion]);

  return {
    // Data
    bikeHistory,
    latestVersion,
    favoriteVersions,
    
    // Actions
    saveVersion,
    deleteVersion,
    toggleVersionFavorite,
    compareVersions,
    
    // Computed
    getVersionStats,
    
    // State
    hasHistory: bikeHistory.length > 0,
    totalVersions: bikeHistory.length
  };
};
