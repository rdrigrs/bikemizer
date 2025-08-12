import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utilitário para combinar classes CSS de forma inteligente
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 