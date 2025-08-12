class BikeCustomizer {
    constructor() {
        this.canvas = document.getElementById('bikeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentColor = '#ff0000';
        this.stickers = [];
        this.bikeType = 'road';
        this.bikeSize = 'medium';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.drawBike();
        this.loadStickers();
    }

    setupEventListeners() {
        // Event listeners para cores
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectColor(e.target.dataset.color);
            });
        });

        // Cor personalizada
        document.getElementById('customColor').addEventListener('change', (e) => {
            this.selectColor(e.target.value);
        });

        // Adesivos
        document.querySelectorAll('.sticker-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.addSticker(e.target.dataset.sticker);
            });
        });

        // Upload de arquivo
        document.getElementById('stickerFile').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });

        // Configurações
        document.getElementById('bikeType').addEventListener('change', (e) => {
            this.bikeType = e.target.value;
            this.drawBike();
        });

        document.getElementById('bikeSize').addEventListener('change', (e) => {
            this.bikeSize = e.target.value;
            this.drawBike();
        });

        // Botões de controle
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetBike();
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveBike();
        });
    }

    selectColor(color) {
        this.currentColor = color;
        
        // Atualizar seleção visual
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.color === color) {
                option.classList.add('selected');
            }
        });

        // Atualizar input de cor personalizada
        document.getElementById('customColor').value = color;
        
        this.drawBike();
    }

    addSticker(stickerType) {
        // Remover seleção anterior
        document.querySelectorAll('.sticker-item').forEach(item => {
            item.classList.remove('selected');
        });

        // Adicionar seleção atual
        event.target.closest('.sticker-item').classList.add('selected');

        // Adicionar adesivo à bicicleta
        const sticker = {
            type: stickerType,
            x: Math.random() * (this.canvas.width - 50) + 25,
            y: Math.random() * (this.canvas.height - 50) + 25,
            size: 30
        };

        this.stickers.push(sticker);
        this.drawBike();
    }

    async handleFileUpload(file) {
        if (!file) return;

        const formData = new FormData();
        formData.append('sticker', file);

        try {
            const response = await fetch('/api/upload-sticker', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                // Adicionar adesivo personalizado
                const sticker = {
                    type: 'custom',
                    url: result.fileUrl,
                    x: Math.random() * (this.canvas.width - 50) + 25,
                    y: Math.random() * (this.canvas.height - 50) + 25,
                    size: 40
                };

                this.stickers.push(sticker);
                this.drawBike();
                
                // Mostrar mensagem de sucesso
                this.showNotification('Adesivo enviado com sucesso!', 'success');
            }
        } catch (error) {
            console.error('Erro ao enviar adesivo:', error);
            this.showNotification('Erro ao enviar adesivo', 'error');
        }
    }

    drawBike() {
        // Limpar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Desenhar bicicleta base
        this.drawBikeBase();
        
        // Aplicar cor
        this.applyColor();
        
        // Desenhar adesivos
        this.drawStickers();
    }

    drawBikeBase() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Ajustar tamanho baseado na seleção
        let scale = 1;
        switch (this.bikeSize) {
            case 'small': scale = 0.8; break;
            case 'large': scale = 1.2; break;
            default: scale = 1;
        }

        // Desenhar quadro da bicicleta
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        // Quadro principal
        this.ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
        this.ctx.lineTo(centerX + 80 * scale, centerY - 40 * scale);
        this.ctx.lineTo(centerX + 60 * scale, centerY + 60 * scale);
        this.ctx.lineTo(centerX - 60 * scale, centerY + 60 * scale);
        this.ctx.closePath();
        this.ctx.stroke();

        // Tubo superior
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
        this.ctx.lineTo(centerX - 40 * scale, centerY - 80 * scale);
        this.ctx.stroke();

        // Tubo do selim
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 40 * scale, centerY - 80 * scale);
        this.ctx.lineTo(centerX - 20 * scale, centerY - 120 * scale);
        this.ctx.stroke();

        // Tubo do guidão
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + 80 * scale, centerY - 40 * scale);
        this.ctx.lineTo(centerX + 100 * scale, centerY - 80 * scale);
        this.ctx.stroke();

        // Rodas
        this.drawWheel(centerX - 60 * scale, centerY + 60 * scale, 30 * scale);
        this.drawWheel(centerX + 60 * scale, centerY + 60 * scale, 30 * scale);

        // Selim
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(centerX - 25 * scale, centerY - 120 * scale, 10 * scale, 5 * scale);

        // Guidão
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(centerX + 95 * scale, centerY - 85 * scale, 10 * scale, 5 * scale);

        // Pedais
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(centerX - 5 * scale, centerY + 55 * scale, 10 * scale, 5 * scale);
    }

    drawWheel(x, y, radius) {
        // Aro da roda
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();

        // Raios da roda
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const startX = x + Math.cos(angle) * 5;
            const startY = y + Math.sin(angle) * 5;
            const endX = x + Math.cos(angle) * radius;
            const endY = y + Math.sin(angle) * radius;
            
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
        }

        // Pneu
        this.ctx.strokeStyle = '#666';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius + 2, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    applyColor() {
        // Aplicar cor ao quadro da bicicleta
        this.ctx.fillStyle = this.currentColor;
        this.ctx.globalAlpha = 0.8;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        let scale = 1;
        
        switch (this.bikeSize) {
            case 'small': scale = 0.8; break;
            case 'large': scale = 1.2; break;
            default: scale = 1;
        }

        // Preencher áreas da bicicleta
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
        this.ctx.lineTo(centerX + 80 * scale, centerY - 40 * scale);
        this.ctx.lineTo(centerX + 60 * scale, centerY + 60 * scale);
        this.ctx.lineTo(centerX - 60 * scale, centerY + 60 * scale);
        this.ctx.closePath();
        this.ctx.fill();

        // Tubo superior
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 80 * scale, centerY - 40 * scale);
        this.ctx.lineTo(centerX - 40 * scale, centerY - 80 * scale);
        this.ctx.lineTo(centerX - 35 * scale, centerY - 75 * scale);
        this.ctx.lineTo(centerX - 75 * scale, centerY - 35 * scale);
        this.ctx.closePath();
        this.ctx.fill();

        // Tubo do selim
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 40 * scale, centerY - 80 * scale);
        this.ctx.lineTo(centerX - 20 * scale, centerY - 120 * scale);
        this.ctx.lineTo(centerX - 15 * scale, centerY - 115 * scale);
        this.ctx.lineTo(centerX - 35 * scale, centerY - 75 * scale);
        this.ctx.closePath();
        this.ctx.fill();

        // Tubo do guidão
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + 80 * scale, centerY - 40 * scale);
        this.ctx.lineTo(centerX + 100 * scale, centerY - 80 * scale);
        this.ctx.lineTo(centerX + 95 * scale, centerY - 75 * scale);
        this.ctx.lineTo(centerX + 75 * scale, centerY - 35 * scale);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.globalAlpha = 1.0;
    }

    drawStickers() {
        this.stickers.forEach(sticker => {
            if (sticker.type === 'custom' && sticker.url) {
                // Adesivo personalizado
                const img = new Image();
                img.onload = () => {
                    this.ctx.drawImage(img, sticker.x - sticker.size/2, sticker.y - sticker.size/2, sticker.size, sticker.size);
                };
                img.src = sticker.url;
            } else {
                // Adesivo padrão
                this.ctx.fillStyle = '#ffd700';
                this.ctx.font = `${sticker.size}px FontAwesome`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                
                let icon = '★';
                switch (sticker.type) {
                    case 'heart': icon = '♥'; break;
                    case 'bolt': icon = '⚡'; break;
                    case 'fire': icon = '🔥'; break;
                    case 'rocket': icon = '🚀'; break;
                    case 'crown': icon = '👑'; break;
                    default: icon = '★';
                }
                
                this.ctx.fillText(icon, sticker.x, sticker.y);
            }
        });
    }

    resetBike() {
        this.currentColor = '#ff0000';
        this.stickers = [];
        this.bikeType = 'road';
        this.bikeSize = 'medium';
        
        // Resetar seleções visuais
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelectorAll('.sticker-item').forEach(item => {
            item.classList.remove('selected');
        });
        document.getElementById('bikeType').value = 'road';
        document.getElementById('bikeSize').value = 'medium';
        document.getElementById('customColor').value = '#ff0000';
        
        this.drawBike();
        this.showNotification('Bicicleta resetada!', 'success');
    }

    async saveBike() {
        const bikeConfig = {
            color: this.currentColor,
            stickers: this.stickers,
            type: this.bikeType,
            size: this.bikeSize,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/save-config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bikeConfig)
            });

            const result = await response.json();
            
            if (result.success) {
                this.showNotification('Bicicleta salva com sucesso!', 'success');
                
                // Adicionar à galeria
                this.addToGallery(bikeConfig);
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            this.showNotification('Erro ao salvar bicicleta', 'error');
        }
    }

    addToGallery(config) {
        const galleryGrid = document.getElementById('galleryGrid');
        
        // Criar canvas para preview
        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = 300;
        previewCanvas.height = 200;
        const previewCtx = previewCanvas.getContext('2d');
        
        // Desenhar preview da bicicleta
        this.drawBikePreview(previewCtx, config, 300, 200);
        
        // Criar item da galeria
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = previewCanvas.toDataURL();
        img.alt = 'Bicicleta customizada';
        
        const content = document.createElement('div');
        content.className = 'gallery-item-content';
        content.innerHTML = `
            <h4>Bicicleta ${config.type}</h4>
            <p>Cor: ${config.color}</p>
            <p>Adesivos: ${config.stickers.length}</p>
        `;
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(content);
        galleryGrid.appendChild(galleryItem);
    }

    drawBikePreview(ctx, config, width, height) {
        // Versão simplificada para preview
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = config.color;
        ctx.fillRect(width/2 - 40, height/2 - 20, 80, 40);
        
        // Adesivos
        config.stickers.forEach((sticker, index) => {
            ctx.fillStyle = '#ffd700';
            ctx.fillText('★', width/2 + (index - config.stickers.length/2) * 20, height/2);
        });
    }

    showNotification(message, type) {
        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    loadStickers() {
        // Carregar adesivos padrão (já implementado no HTML)
        console.log('Adesivos padrão carregados');
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new BikeCustomizer();
}); 