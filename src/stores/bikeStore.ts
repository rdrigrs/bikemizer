import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Bike, BikeConfiguration, BikeStore as IBikeStore } from '@/types';
import { BikeService } from '@/services/BikeService';

// Single Responsibility Principle - Esta store só gerencia estado de bicicletas
export const useBikeStore = create<IBikeStore>()(
  devtools(
    (set, get) => ({
      // State
      bikes: [],
      currentBike: null,
      isLoading: false,
      error: null,

      // Actions
      setBikes: (bikes: Bike[]) => set({ bikes }),

      setCurrentBike: (bike: Bike | null) => set({ currentBike: bike }),

      addBike: (bike: Bike) => set((state) => ({ 
        bikes: [...state.bikes, bike] 
      })),

      updateBike: (id: string, updates: Partial<Bike>) => set((state) => ({
        bikes: state.bikes.map(bike => 
          bike.id === id ? { ...bike, ...updates } : bike
        ),
        currentBike: state.currentBike?.id === id 
          ? { ...state.currentBike, ...updates }
          : state.currentBike
      })),

      deleteBike: (id: string) => set((state) => ({
        bikes: state.bikes.filter(bike => bike.id !== id),
        currentBike: state.currentBike?.id === id ? null : state.currentBike
      })),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      // Async actions
      createBike: async (config: BikeConfiguration) => {
        try {
          set({ isLoading: true, error: null });
          const bikeService = new BikeService();
          const newBike = await bikeService.createBike(config);
          
          get().addBike(newBike);
          get().setCurrentBike(newBike);
          get().setLoading(false);
          
          return newBike;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          get().setError(errorMessage);
          get().setLoading(false);
          throw error;
        }
      },

      updateBikeAsync: async (id: string, config: Partial<BikeConfiguration>) => {
        try {
          set({ isLoading: true, error: null });
          const bikeService = new BikeService();
          const updatedBike = await bikeService.updateBike(id, config);
          
          get().updateBike(id, updatedBike);
          get().setLoading(false);
          
          return updatedBike;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          get().setError(errorMessage);
          get().setLoading(false);
          throw error;
        }
      },

      deleteBikeAsync: async (id: string) => {
        try {
          set({ isLoading: true, error: null });
          const bikeService = new BikeService();
          await bikeService.deleteBike(id);
          
          get().deleteBike(id);
          get().setLoading(false);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          get().setError(errorMessage);
          get().setLoading(false);
          throw error;
        }
      },

      loadBikes: async () => {
        try {
          set({ isLoading: true, error: null });
          const bikeService = new BikeService();
          const bikes = await bikeService.getAllBikes();
          
          get().setBikes(bikes);
          get().setLoading(false);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          get().setError(errorMessage);
          get().setLoading(false);
        }
      },

      // Computed values
      getBikeById: (id: string) => {
        const state = get();
        return state.bikes.find(bike => bike.id === id) || null;
      },

      getBikesByType: (type: string) => {
        const state = get();
        return state.bikes.filter(bike => bike.type === type);
      },

      getBikesBySize: (size: string) => {
        const state = get();
        return state.bikes.filter(bike => bike.size === size);
      },

      getBikesByColor: (color: string) => {
        const state = get();
        return state.bikes.filter(bike => bike.color === color);
      },

      // Utility methods
      clearError: () => set({ error: null }),

      reset: () => set({
        bikes: [],
        currentBike: null,
        isLoading: false,
        error: null
      }),
    }),
    {
      name: 'bike-store',
    }
  )
); 