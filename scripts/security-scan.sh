#!/bin/bash
# 🔒 Script de Segurança - BikeMizer
# Uso: ./scripts/security-scan.sh [test|monitor|fix|docker]

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar argumentos
ACTION=${1:-test}

# Verificar se Snyk está instalado
if ! command -v snyk &> /dev/null; then
    error "Snyk não está instalado!"
    echo "Instale com: npm install -g snyk"
    exit 1
fi

# Verificar se está autenticado
if ! snyk auth --check &> /dev/null; then
    warning "Snyk não está autenticado!"
    echo "Execute: snyk auth"
    exit 1
fi

case $ACTION in
    "test")
        log "Executando teste de segurança do código..."
        snyk test --severity-threshold=medium
        success "Teste de segurança concluído!"
        ;;
        
    "monitor")
        log "Enviando resultados para monitoramento do Snyk..."
        snyk monitor --project-name="bikemizer"
        success "Monitoramento configurado!"
        ;;
        
    "fix")
        log "Executando wizard de correção do Snyk..."
        snyk wizard
        success "Wizard de correção concluído!"
        ;;
        
    "docker")
        log "Testando segurança da imagem Docker..."
        
        # Verificar se a imagem existe
        if ! docker image inspect bikemizer-app:latest &> /dev/null; then
            warning "Imagem Docker não encontrada. Construindo..."
            docker build -t bikemizer-app:latest .
        fi
        
        # Testar imagem
        snyk container test bikemizer-app:latest --severity-threshold=medium
        
        # Monitorar imagem
        snyk container monitor bikemizer-app:latest
        
        success "Análise de segurança Docker concluída!"
        ;;
        
    "audit")
        log "Executando auditoria completa..."
        
        echo "1. Auditoria NPM..."
        npm audit
        
        echo "2. Teste Snyk..."
        snyk test --severity-threshold=medium
        
        echo "3. Teste Docker..."
        if docker image inspect bikemizer-app:latest &> /dev/null; then
            snyk container test bikemizer-app:latest --severity-threshold=medium
        else
            warning "Imagem Docker não encontrada. Pulando teste Docker."
        fi
        
        success "Auditoria completa concluída!"
        ;;
        
    "report")
        log "Gerando relatório de segurança..."
        
        # Criar diretório de relatórios
        mkdir -p reports
        
        # Gerar relatório NPM
        npm audit --json > reports/npm-audit.json
        
        # Gerar relatório Snyk
        snyk test --json > reports/snyk-test.json
        
        # Gerar relatório Docker (se disponível)
        if docker image inspect bikemizer-app:latest &> /dev/null; then
            snyk container test bikemizer-app:latest --json > reports/snyk-docker.json
        fi
        
        success "Relatórios gerados em reports/"
        ;;
        
    *)
        echo "Uso: $0 [test|monitor|fix|docker|audit|report]"
        echo ""
        echo "Comandos disponíveis:"
        echo "  test    - Testar vulnerabilidades no código"
        echo "  monitor - Enviar para monitoramento Snyk"
        echo "  fix     - Executar wizard de correção"
        echo "  docker  - Testar segurança da imagem Docker"
        echo "  audit   - Auditoria completa (NPM + Snyk + Docker)"
        echo "  report  - Gerar relatórios em JSON"
        exit 1
        ;;
esac
