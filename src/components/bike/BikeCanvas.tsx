import React, { useRef, useEffect, useCallback, memo } from 'react';
import { BikeType, BikeSize } from '@/types';

interface BikeCanvasProps {
  color: string;
  stickers: Array<{ type: string; x: number; y: number; size: number }>;
  bikeType: BikeType;
  bikeSize: BikeSize;
  showGrid?: boolean;
  showLabels?: boolean;
  className?: string;
}

const BikeCanvasComponent: React.FC<BikeCanvasProps> = ({
  color,
  stickers,
  bikeType,
  bikeSize,
  showGrid = false,
  showLabels = false,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBike = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar grid se solicitado
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }

    // Configurar escala baseada no tamanho
    let scale = 1;
    switch (bikeSize) {
      case BikeSize.SMALL: scale = 0.8; break;
      case BikeSize.LARGE: scale = 1.2; break;
      default: scale = 1;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Desenhar bicicleta base
    drawBikeBase(ctx, centerX, centerY, scale);
    
    // Aplicar cor
    applyColor(ctx, centerX, centerY, scale);
    
    // Desenhar adesivos
    drawStickers(ctx, stickers);

    // Desenhar labels se solicitado
    if (showLabels) {
      drawLabels(ctx, centerX, centerY, scale);
    }
  }, [color, stickers, bikeType, bikeSize, showGrid, showLabels]);

  useEffect(() => {
    drawBike();
  }, [drawBike]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;

    // Grid vertical
    for (let x = 0; x <= width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Grid horizontal
    for (let y = 0; y <= height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.globalAlpha = 1.0;
  };

  const drawLabels = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number) => {
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    
    // Label do tipo
    ctx.fillText(bikeType.toUpperCase(), centerX, centerY - 140 * scale);
    
    // Label do tamanho
    ctx.fillText(bikeSize.toUpperCase(), centerX, centerY + 120 * scale);
    
    // Label da cor
    ctx.fillText(`#${color.replace('#', '')}`, centerX, centerY - 160 * scale);
  };

  const drawBikeBase = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number) => {
    // Configurar estilo para linhas mais suaves
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Quadro principal com cantos arredondados
    ctx.beginPath();
    ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX + 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX + 60 * scale, centerY + 60 * scale);
    ctx.lineTo(centerX - 60 * scale, centerY + 60 * scale);
    ctx.closePath();
    ctx.stroke();

    // Tubo superior com curva mais suave
    ctx.beginPath();
    ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
    ctx.quadraticCurveTo(centerX - 60 * scale, centerY - 60 * scale, centerX - 40 * scale, centerY - 80 * scale);
    ctx.stroke();

    // Tubo do selim
    ctx.beginPath();
    ctx.moveTo(centerX - 40 * scale, centerY - 80 * scale);
    ctx.lineTo(centerX - 20 * scale, centerY - 120 * scale);
    ctx.stroke();

    // Tubo do guidão
    ctx.beginPath();
    ctx.moveTo(centerX + 80 * scale, centerY - 40 * scale);
    ctx.quadraticCurveTo(centerX + 90 * scale, centerY - 60 * scale, centerX + 100 * scale, centerY - 80 * scale);
    ctx.stroke();

    // Rodas com mais detalhes
    drawWheel(ctx, centerX - 60 * scale, centerY + 60 * scale, 30 * scale);
    drawWheel(ctx, centerX + 60 * scale, centerY + 60 * scale, 30 * scale);

    // Selim com design melhorado
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.ellipse(centerX - 20 * scale, centerY - 120 * scale, 8 * scale, 4 * scale, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Guidão com design melhorado
    ctx.beginPath();
    ctx.ellipse(centerX + 100 * scale, centerY - 80 * scale, 8 * scale, 4 * scale, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Pedais com design melhorado
    ctx.fillStyle = '#4b5563';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 55 * scale, 6 * scale, 3 * scale, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Corrente
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 20 * scale, centerY - 20 * scale);
    ctx.lineTo(centerX + 20 * scale, centerY - 20 * scale);
    ctx.stroke();
  };

  const drawWheel = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    // Aro da roda com gradiente
    const gradient = ctx.createRadialGradient(x, y, radius - 5, x, y, radius);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#9ca3af');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Aro externo
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Raios da roda com design melhorado
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const startX = x + Math.cos(angle) * 3;
      const startY = y + Math.sin(angle) * 3;
      const endX = x + Math.cos(angle) * (radius - 2);
      const endY = y + Math.sin(angle) * (radius - 2);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // Centro da roda
    ctx.fillStyle = '#4b5563';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Pneu com textura
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(x, y, radius + 3, 0, 2 * Math.PI);
    ctx.stroke();

    // Detalhes do pneu
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const startX = x + Math.cos(angle) * (radius + 1);
      const startY = y + Math.sin(angle) * (radius + 1);
      const endX = x + Math.cos(angle) * (radius + 5);
      const endY = y + Math.sin(angle) * (radius + 5);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  };

  const applyColor = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number) => {
    // Criar gradiente para dar profundidade à cor
    const gradient = ctx.createLinearGradient(
      centerX - 80 * scale, centerY - 40 * scale,
      centerX + 80 * scale, centerY + 60 * scale
    );
    
    // Adicionar variação de cor para simular iluminação
    const baseColor = color;
    const lighterColor = adjustColorBrightness(baseColor, 20);
    const darkerColor = adjustColorBrightness(baseColor, -20);
    
    gradient.addColorStop(0, lighterColor);
    gradient.addColorStop(0.5, baseColor);
    gradient.addColorStop(1, darkerColor);
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.9;
    
    // Preencher áreas da bicicleta com formas mais suaves
    ctx.beginPath();
    ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX + 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX + 60 * scale, centerY + 60 * scale);
    ctx.lineTo(centerX - 60 * scale, centerY + 60 * scale);
    ctx.closePath();
    ctx.fill();

    // Tubo superior com gradiente
    ctx.beginPath();
    ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
    ctx.quadraticCurveTo(centerX - 60 * scale, centerY - 60 * scale, centerX - 40 * scale, centerY - 80 * scale);
    ctx.lineTo(centerX - 35 * scale, centerY - 75 * scale);
    ctx.quadraticCurveTo(centerX - 55 * scale, centerY - 55 * scale, centerX - 75 * scale, centerY - 35 * scale);
    ctx.closePath();
    ctx.fill();

    // Tubo do selim
    ctx.beginPath();
    ctx.moveTo(centerX - 40 * scale, centerY - 80 * scale);
    ctx.lineTo(centerX - 20 * scale, centerY - 120 * scale);
    ctx.lineTo(centerX - 15 * scale, centerY - 115 * scale);
    ctx.lineTo(centerX - 35 * scale, centerY - 75 * scale);
    ctx.closePath();
    ctx.fill();

    // Tubo do guidão
    ctx.beginPath();
    ctx.moveTo(centerX + 80 * scale, centerY - 40 * scale);
    ctx.quadraticCurveTo(centerX + 90 * scale, centerY - 60 * scale, centerX + 100 * scale, centerY - 80 * scale);
    ctx.lineTo(centerX + 95 * scale, centerY - 75 * scale);
    ctx.quadraticCurveTo(centerX + 85 * scale, centerY - 55 * scale, centerX + 75 * scale, centerY - 35 * scale);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = 1.0;
  };

  // Função auxiliar para ajustar brilho da cor
  const adjustColorBrightness = (color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const drawStickers = (ctx: CanvasRenderingContext2D, stickers: Array<{ type: string; x: number; y: number; size: number }>) => {
    stickers.forEach(sticker => {
      // Adicionar sombra ao adesivo
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Cor do adesivo com gradiente
      const gradient = ctx.createRadialGradient(sticker.x, sticker.y, 0, sticker.x, sticker.y, sticker.size);
      gradient.addColorStop(0, '#ffd700');
      gradient.addColorStop(1, '#ffed4e');
      
      ctx.fillStyle = gradient;
      ctx.font = `bold ${sticker.size}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      let icon = '★';
      switch (sticker.type) {
        case 'heart': icon = '♥'; break;
        case 'bolt': icon = '⚡'; break;
        case 'fire': icon = '🔥'; break;
        case 'rocket': icon = '🚀'; break;
        case 'crown': icon = '👑'; break;
        default: icon = '★';
      }
      
      ctx.fillText(icon, sticker.x, sticker.y);
      
      // Resetar sombra
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    });
  };

  return (
    <div className={`w-full ${className}`}>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-auto border-2 border-gray-300 rounded-lg bg-gray-50"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

// Memoizar o componente para evitar re-renderizações desnecessárias
export const BikeCanvas = memo(BikeCanvasComponent, (prevProps, nextProps) => {
  return (
    prevProps.color === nextProps.color &&
    prevProps.bikeType === nextProps.bikeType &&
    prevProps.bikeSize === nextProps.bikeSize &&
    prevProps.showGrid === nextProps.showGrid &&
    prevProps.showLabels === nextProps.showLabels &&
    prevProps.className === nextProps.className &&
    prevProps.stickers.length === nextProps.stickers.length &&
    prevProps.stickers.every((sticker, index) => 
      sticker.type === nextProps.stickers[index]?.type &&
      sticker.x === nextProps.stickers[index]?.x &&
      sticker.y === nextProps.stickers[index]?.y &&
      sticker.size === nextProps.stickers[index]?.size
    )
  );
}); 