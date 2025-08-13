// Tipos principais da aplicação seguindo princípios SOLID

// Single Responsibility Principle - Cada tipo tem uma responsabilidade específica

export interface Bike {
  id: string;
  type: BikeType;
  size: BikeSize;
  color: string;
  stickers: Sticker[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Sticker {
  id: string;
  type: StickerType;
  url?: string;
  position: Position;
  size: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface BikeConfiguration {
  type: BikeType;
  size: BikeSize;
  color: string;
  stickers: Omit<Sticker, 'id'>[];
}

// Enums para valores específicos
export enum BikeType {
  ROAD = 'road',
  MOUNTAIN = 'mountain',
  CITY = 'city',
  BMX = 'bmx',
}

export enum BikeSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum StickerType {
  STAR = 'star',
  HEART = 'heart',
  BOLT = 'bolt',
  FIRE = 'fire',
  ROCKET = 'rocket',
  CROWN = 'crown',
  CUSTOM = 'custom',
}

// Tipos para validação
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Tipos para serviços
export interface BikeService {
  createBike(config: BikeConfiguration): Promise<Bike>;
  updateBike(id: string, config: Partial<BikeConfiguration>): Promise<Bike>;
  deleteBike(id: string): Promise<void>;
  getBike(id: string): Promise<Bike | null>;
  getAllBikes(): Promise<Bike[]>;
}

export interface StickerService {
  uploadSticker(file: File): Promise<Sticker>;
  deleteSticker(id: string): Promise<void>;
  getSticker(id: string): Promise<Sticker | null>;
  getAllStickers(): Promise<Sticker[]>;
}

// Tipos para stores (Zustand)
export interface BikeStore {
  bikes: Bike[];
  currentBike: Bike | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setBikes: (bikes: Bike[]) => void;
  setCurrentBike: (bike: Bike | null) => void;
  addBike: (bike: Bike) => void;
  updateBike: (id: string, updates: Partial<Bike>) => void;
  deleteBike: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Tipos para componentes
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends ComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'color';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

// Tipos para hooks
export interface UseBikeReturn {
  bike: Bike | null;
  isLoading: boolean;
  error: string | null;
  createBike: (config: BikeConfiguration) => Promise<void>;
  updateBike: (id: string, config: Partial<BikeConfiguration>) => Promise<void>;
  deleteBike: (id: string) => Promise<void>;
}

export interface UseStickerReturn {
  stickers: Sticker[];
  isLoading: boolean;
  error: string | null;
  uploadSticker: (file: File) => Promise<void>;
  deleteSticker: (id: string) => Promise<void>;
}

// Tipos para eventos
export interface BikeCustomizationEvent {
  type: 'color-change' | 'sticker-add' | 'sticker-remove' | 'size-change' | 'type-change';
  data: any;
  timestamp: Date;
}

// Tipos para configuração da aplicação
export interface AppConfig {
  apiUrl: string;
  maxFileSize: number;
  allowedFileTypes: string[];
  defaultBikeColor: string;
  defaultBikeType: BikeType;
  defaultBikeSize: BikeSize;
} 

// Tipos para o sistema de histórico
export interface CustomizationHistory {
  id: string;
  bikeId: string;
  version: number;
  configuration: BikeConfiguration;
  timestamp: Date;
  description?: string;
  isFavorite: boolean;
}

export interface HistoryComparison {
  version1: CustomizationHistory;
  version2: CustomizationHistory;
  differences: CustomizationDifference[];
}

export interface CustomizationDifference {
  field: 'color' | 'stickers' | 'type' | 'size';
  oldValue: any;
  newValue: any;
  changeType: 'added' | 'removed' | 'modified';
} 