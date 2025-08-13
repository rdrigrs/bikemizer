import React, { useRef, useEffect, useCallback } from 'react';
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

export const BikeCanvas: React.FC<BikeCanvasProps> = ({
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
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;

    // Quadro principal
    ctx.beginPath();
    ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX + 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX + 60 * scale, centerY + 60 * scale);
    ctx.lineTo(centerX - 60 * scale, centerY + 60 * scale);
    ctx.closePath();
    ctx.stroke();

    // Tubo superior
    ctx.beginPath();
    ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX - 40 * scale, centerY - 80 * scale);
    ctx.stroke();

    // Tubo do selim
    ctx.beginPath();
    ctx.moveTo(centerX - 40 * scale, centerY - 80 * scale);
    ctx.lineTo(centerX - 20 * scale, centerY - 120 * scale);
    ctx.stroke();

    // Tubo do guidão
    ctx.beginPath();
    ctx.moveTo(centerX + 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX + 100 * scale, centerY - 80 * scale);
    ctx.stroke();

    // Rodas
    drawWheel(ctx, centerX - 60 * scale, centerY + 60 * scale, 30 * scale);
    drawWheel(ctx, centerX + 60 * scale, centerY + 60 * scale, 30 * scale);

    // Selim
    ctx.fillStyle = '#333';
    ctx.fillRect(centerX - 25 * scale, centerY - 120 * scale, 10 * scale, 5 * scale);

    // Guidão
    ctx.fillRect(centerX + 95 * scale, centerY - 85 * scale, 10 * scale, 5 * scale);

    // Pedais
    ctx.fillRect(centerX - 5 * scale, centerY + 55 * scale, 10 * scale, 5 * scale);
  };

  const drawWheel = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    // Aro da roda
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Raios da roda
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const startX = x + Math.cos(angle) * 5;
      const startY = y + Math.sin(angle) * 5;
      const endX = x + Math.cos(angle) * radius;
      const endY = y + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // Pneu
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, radius + 2, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const applyColor = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number) => {
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.8;
    
    // Preencher áreas da bicicleta
    ctx.beginPath();
    ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX + 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX + 60 * scale, centerY + 60 * scale);
    ctx.lineTo(centerX - 60 * scale, centerY + 60 * scale);
    ctx.closePath();
    ctx.fill();

    // Tubo superior
    ctx.beginPath();
    ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
    ctx.lineTo(centerX - 40 * scale, centerY - 80 * scale);
    ctx.lineTo(centerX - 35 * scale, centerY - 75 * scale);
    ctx.lineTo(centerX - 75 * scale, centerY - 35 * scale);
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
    ctx.lineTo(centerX + 100 * scale, centerY - 80 * scale);
    ctx.lineTo(centerX + 95 * scale, centerY - 75 * scale);
    ctx.lineTo(centerX + 75 * scale, centerY - 35 * scale);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = 1.0;
  };

  const drawStickers = (ctx: CanvasRenderingContext2D, stickers: Array<{ type: string; x: number; y: number; size: number }>) => {
    stickers.forEach(sticker => {
      ctx.fillStyle = '#ffd700';
      ctx.font = `${sticker.size}px Arial`;
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