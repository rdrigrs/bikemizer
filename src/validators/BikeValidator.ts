import { BikeConfiguration, ValidationResult, BikeType, BikeSize } from '@/types';

// Single Responsibility Principle - Esta classe só valida configurações de bicicletas
export class BikeValidator {
  private static readonly MAX_STICKERS = 10;
  private static readonly MIN_STICKER_SIZE = 10;
  private static readonly MAX_STICKER_SIZE = 100;

  // Open/Closed Principle - Fácil de estender sem modificar
  public static validateConfiguration(config: BikeConfiguration): ValidationResult {
    const errors: string[] = [];

    // Validar tipo
    if (!this.isValidBikeType(config.type)) {
      errors.push('Tipo de bicicleta inválido');
    }

    // Validar tamanho
    if (!this.isValidBikeSize(config.size)) {
      errors.push('Tamanho de bicicleta inválido');
    }

    // Validar cor
    if (!this.isValidColor(config.color)) {
      errors.push('Cor inválida');
    }

    // Validar adesivos
    const stickerErrors = this.validateStickers(config.stickers);
    errors.push(...stickerErrors);

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static isValidBikeType(type: string): boolean {
    return Object.values(BikeType).includes(type as BikeType);
  }

  private static isValidBikeSize(size: string): boolean {
    return Object.values(BikeSize).includes(size as BikeSize);
  }

  private static isValidColor(color: string): boolean {
    // Validar formato hexadecimal
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexColorRegex.test(color);
  }

  private static validateStickers(stickers: any[]): string[] {
    const errors: string[] = [];

    if (stickers.length > this.MAX_STICKERS) {
      errors.push(`Máximo de ${this.MAX_STICKERS} adesivos permitidos`);
    }

    stickers.forEach((sticker, index) => {
      if (!sticker.type) {
        errors.push(`Adesivo ${index + 1}: tipo é obrigatório`);
      }

      if (sticker.size < this.MIN_STICKER_SIZE || sticker.size > this.MAX_STICKER_SIZE) {
        errors.push(`Adesivo ${index + 1}: tamanho deve estar entre ${this.MIN_STICKER_SIZE} e ${this.MAX_STICKER_SIZE}`);
      }

      if (!sticker.position || typeof sticker.position.x !== 'number' || typeof sticker.position.y !== 'number') {
        errors.push(`Adesivo ${index + 1}: posição inválida`);
      }
    });

    return errors;
  }

  // Interface Segregation Principle - Métodos específicos para diferentes tipos de validação
  public static validateColor(color: string): ValidationResult {
    const errors: string[] = [];
    
    if (!this.isValidColor(color)) {
      errors.push('Formato de cor inválido. Use formato hexadecimal (#RRGGBB)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  public static validateStickerCount(count: number): ValidationResult {
    const errors: string[] = [];
    
    if (count > this.MAX_STICKERS) {
      errors.push(`Máximo de ${this.MAX_STICKERS} adesivos permitidos`);
    }

    if (count < 0) {
      errors.push('Quantidade de adesivos não pode ser negativa');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
} 