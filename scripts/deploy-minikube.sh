#!/bin/bash
# ☸️ Script de Deploy para Minikube - BikeMizer
# Uso: ./scripts/deploy-minikube.sh [start|stop|restart|status|logs]

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
ACTION=${1:-start}

# Verificar se Minikube está instalado
if ! command -v minikube &> /dev/null; then
    error "Minikube não está instalado!"
    echo "Instale com: https://minikube.sigs.k8s.io/docs/start/"
    exit 1
fi

# Verificar se kubectl está instalado
if ! command -v kubectl &> /dev/null; then
    error "kubectl não está instalado!"
    echo "Instale com: https://kubernetes.io/docs/tasks/tools/"
    exit 1
fi

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    error "Docker não está instalado!"
    exit 1
fi

case $ACTION in
    "start")
        log "Iniciando deploy no Minikube..."
        
        # 1. Verificar se Minikube está rodando
        if ! minikube status &> /dev/null; then
            log "Iniciando Minikube..."
            minikube start --driver=docker --memory=4096 --cpus=2
        else
            log "Minikube já está rodando"
        fi
        
        # 2. Configurar Docker para usar Minikube
        log "Configurando Docker para Minikube..."
        eval $(minikube docker-env)
        
        # 3. Build da imagem Docker
        log "Construindo imagem Docker..."
        docker build -t bikemizer-app:latest .
        
        # 4. Aplicar configurações Kubernetes
        log "Aplicando configurações Kubernetes..."
        kubectl apply -f k8s/configmap.yaml
        kubectl apply -f k8s/secret.yaml
        kubectl apply -f k8s/deployment.yaml
        kubectl apply -f k8s/ingress.yaml
        kubectl apply -f k8s/hpa.yaml
        
        # 5. Aguardar pods ficarem prontos
        log "Aguardando pods ficarem prontos..."
        kubectl wait --for=condition=ready pod -l app=bikemizer --timeout=300s
        
        # 6. Habilitar Ingress no Minikube
        log "Habilitando Ingress no Minikube..."
        minikube addons enable ingress
        
        # 7. Aguardar Ingress ficar pronto
        log "Aguardando Ingress ficar pronto..."
        kubectl wait --namespace ingress-nginx \
          --for=condition=ready pod \
          --selector=app.kubernetes.io/component=controller \
          --timeout=300s
        
        success "Deploy concluído com sucesso!"
        
        # 8. Mostrar informações de acesso
        log "Informações de acesso:"
        echo "🌐 URL: http://bikemizer.local"
        echo "📊 Dashboard: minikube dashboard"
        echo "🔍 Status: kubectl get all"
        echo "📝 Logs: kubectl logs -f deployment/bikemizer-app"
        
        # 9. Adicionar entrada no /etc/hosts (Linux/Mac)
        if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
            log "Adicionando entrada no /etc/hosts..."
            MINIKUBE_IP=$(minikube ip)
            if ! grep -q "bikemizer.local" /etc/hosts; then
                echo "$MINIKUBE_IP bikemizer.local" | sudo tee -a /etc/hosts
                success "Entrada adicionada ao /etc/hosts"
            else
                warning "Entrada já existe no /etc/hosts"
            fi
        fi
        
        ;;
        
    "stop")
        log "Parando aplicação no Minikube..."
        kubectl delete -f k8s/ingress.yaml --ignore-not-found=true
        kubectl delete -f k8s/hpa.yaml --ignore-not-found=true
        kubectl delete -f k8s/deployment.yaml --ignore-not-found=true
        kubectl delete -f k8s/configmap.yaml --ignore-not-found=true
        kubectl delete -f k8s/secret.yaml --ignore-not-found=true
        success "Aplicação parada!"
        ;;
        
    "restart")
        log "Reiniciando aplicação no Minikube..."
        $0 stop
        sleep 5
        $0 start
        ;;
        
    "status")
        log "Status da aplicação:"
        echo ""
        echo "📊 Pods:"
        kubectl get pods -l app=bikemizer
        echo ""
        echo "🌐 Services:"
        kubectl get services -l app=bikemizer
        echo ""
        echo "🔗 Ingress:"
        kubectl get ingress -l app=bikemizer
        echo ""
        echo "📈 HPA:"
        kubectl get hpa -l app=bikemizer
        echo ""
        echo "💾 PVC:"
        kubectl get pvc -l app=bikemizer
        ;;
        
    "logs")
        log "Mostrando logs da aplicação:"
        kubectl logs -f deployment/bikemizer-app
        ;;
        
    "dashboard")
        log "Abrindo dashboard do Minikube..."
        minikube dashboard
        ;;
        
    "tunnel")
        log "Iniciando tunnel do Minikube..."
        log "Isso permitirá acesso externo à aplicação"
        minikube tunnel
        ;;
        
    *)
        echo "Uso: $0 [start|stop|restart|status|logs|dashboard|tunnel]"
        echo ""
        echo "Comandos disponíveis:"
        echo "  start    - Inicia a aplicação no Minikube"
        echo "  stop     - Para a aplicação no Minikube"
        echo "  restart  - Reinicia a aplicação no Minikube"
        echo "  status   - Mostra status da aplicação"
        echo "  logs     - Mostra logs da aplicação"
        echo "  dashboard - Abre dashboard do Minikube"
        echo "  tunnel   - Inicia tunnel para acesso externo"
        exit 1
        ;;
esac
