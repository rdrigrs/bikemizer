import { Bike, BikeConfiguration, BikeService as IBikeService } from '@/types';
import { BikeValidator } from '@/validators/BikeValidator';
import { generateId } from '@/utils/idGenerator';

// Dependency Inversion Principle - Implementa a interface IBikeService
export class BikeService implements IBikeService {
  private bikes: Bike[] = [];

  // Single Responsibility Principle - Esta classe só gerencia bicicletas
  async createBike(config: BikeConfiguration): Promise<Bike> {
    // Validar configuração antes de criar
    const validation = BikeValidator.validateConfiguration(config);
    if (!validation.isValid) {
      throw new Error(`Configuração inválida: ${validation.errors.join(', ')}`);
    }

    const bike: Bike = {
      id: generateId(),
      ...config,
      stickers: config.stickers.map(sticker => ({
        ...sticker,
        id: generateId()
      })),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.bikes.push(bike);
    return bike;
  }

  async updateBike(id: string, config: Partial<BikeConfiguration>): Promise<Bike> {
    const bikeIndex = this.bikes.findIndex(bike => bike.id === id);
    if (bikeIndex === -1) {
      throw new Error('Bicicleta não encontrada');
    }

    const existingBike = this.bikes[bikeIndex];
    
    // Processar stickers se fornecidos
    let processedStickers = existingBike.stickers;
    if (config.stickers) {
      processedStickers = config.stickers.map(sticker => ({
        ...sticker,
        id: generateId()
      }));
    }

    const updatedBike: Bike = {
      ...existingBike,
      ...config,
      stickers: processedStickers,
      updatedAt: new Date()
    };

    // Validar se a configuração atualizada é válida
    if (config.stickers || config.color || config.size || config.type) {
      const validation = BikeValidator.validateConfiguration({
        type: updatedBike.type,
        size: updatedBike.size,
        color: updatedBike.color,
        stickers: updatedBike.stickers.map(sticker => ({
          type: sticker.type,
          url: sticker.url,
          position: sticker.position,
          size: sticker.size
        }))
      });

      if (!validation.isValid) {
        throw new Error(`Configuração inválida: ${validation.errors.join(', ')}`);
      }
    }

    this.bikes[bikeIndex] = updatedBike;
    return updatedBike;
  }

  async deleteBike(id: string): Promise<void> {
    const bikeIndex = this.bikes.findIndex(bike => bike.id === id);
    if (bikeIndex === -1) {
      throw new Error('Bicicleta não encontrada');
    }

    this.bikes.splice(bikeIndex, 1);
  }

  async getBike(id: string): Promise<Bike | null> {
    return this.bikes.find(bike => bike.id === id) || null;
  }

  async getAllBikes(): Promise<Bike[]> {
    return [...this.bikes];
  }

  // Métodos específicos para diferentes tipos de bicicleta
  async getBikesByType(type: string): Promise<Bike[]> {
    return this.bikes.filter(bike => bike.type === type);
  }

  async getBikesBySize(size: string): Promise<Bike[]> {
    return this.bikes.filter(bike => bike.size === size);
  }

  async getBikesByColor(color: string): Promise<Bike[]> {
    return this.bikes.filter(bike => bike.color === color);
  }

  // Método para buscar bicicletas com filtros combinados
  async searchBikes(filters: {
    type?: string;
    size?: string;
    color?: string;
    hasStickers?: boolean;
  }): Promise<Bike[]> {
    return this.bikes.filter(bike => {
      if (filters.type && bike.type !== filters.type) return false;
      if (filters.size && bike.size !== filters.size) return false;
      if (filters.color && bike.color !== filters.color) return false;
      if (filters.hasStickers !== undefined) {
        const hasStickers = bike.stickers.length > 0;
        if (hasStickers !== filters.hasStickers) return false;
      }
      return true;
    });
  }
} 