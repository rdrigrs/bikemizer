import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bike, CustomizationHistory, BikeConfiguration } from '@/types';

interface BikeStore {
  bikes: Bike[];
  currentBike: Bike | null;
  customizationHistory: CustomizationHistory[];
  isLoading: boolean;
  error: string | null;
  
  // Actions básicas
  setBikes: (bikes: Bike[]) => void;
  setCurrentBike: (bike: Bike | null) => void;
  addBike: (bike: Bike) => void;
  updateBike: (id: string, updates: Partial<Bike>) => void;
  deleteBike: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Actions para histórico
  addToHistory: (configuration: BikeConfiguration, description?: string) => void;
  removeFromHistory: (historyId: string) => void;
  toggleFavorite: (historyId: string) => void;
  clearHistory: () => void;
  getHistoryForBike: (bikeId: string) => CustomizationHistory[];
  getLatestVersion: (bikeId: string) => CustomizationHistory | null;
}

export const useBikeStore = create<BikeStore>()(
  persist(
    (set, get) => ({
      bikes: [],
      currentBike: null,
      customizationHistory: [],
      isLoading: false,
      error: null,
      
      setBikes: (bikes) => set({ bikes }),
      setCurrentBike: (bike) => set({ currentBike: bike }),
      addBike: (bike) => set((state) => ({ bikes: [...state.bikes, bike] })),
      updateBike: (id, updates) => set((state) => ({
        bikes: state.bikes.map(bike => 
          bike.id === id ? { ...bike, ...updates } : bike
        )
      })),
      deleteBike: (id) => set((state) => ({
        bikes: state.bikes.filter(bike => bike.id !== id)
      })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      
      addToHistory: (configuration, description) => {
        const state = get();
        const bikeId = state.currentBike?.id || 'default';
        const latestVersion = state.getLatestVersion(bikeId);
        const newVersion = (latestVersion?.version || 0) + 1;
        
        const historyEntry: CustomizationHistory = {
          id: `history_${Date.now()}`,
          bikeId,
          version: newVersion,
          configuration,
          timestamp: new Date(),
          description: description || `Versão ${newVersion}`,
          isFavorite: false,
        };
        
        set((state) => ({
          customizationHistory: [...state.customizationHistory, historyEntry]
        }));
      },
      
      removeFromHistory: (historyId) => set((state) => ({
        customizationHistory: state.customizationHistory.filter(h => h.id !== historyId)
      })),
      
      toggleFavorite: (historyId) => set((state) => ({
        customizationHistory: state.customizationHistory.map(h => 
          h.id === historyId ? { ...h, isFavorite: !h.isFavorite } : h
        )
      })),
      
      clearHistory: () => set({ customizationHistory: [] }),
      
      getHistoryForBike: (bikeId) => {
        const state = get();
        return state.customizationHistory
          .filter(h => h.bikeId === bikeId)
          .sort((a, b) => b.version - a.version);
      },
      
      getLatestVersion: (bikeId) => {
        const state = get();
        const bikeHistory = state.getHistoryForBike(bikeId);
        return bikeHistory.length > 0 ? bikeHistory[0] : null;
      },
    }),
    {
      name: 'bike-store',
      partialize: (state) => ({ 
        bikes: state.bikes, 
        customizationHistory: state.customizationHistory 
      }),
    }
  )
); 