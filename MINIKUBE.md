# ☸️ Guia Minikube - BikeMizer

Este guia te ensina como usar Kubernetes com Minikube para o projeto BikeMizer.

## 📋 Pré-requisitos

### Instalação necessária:

1. **Minikube**
   ```bash
   # Linux
   curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
   sudo install minikube-linux-amd64 /usr/local/bin/minikube
   
   # macOS
   brew install minikube
   
   # Windows
   choco install minikube
   ```

2. **kubectl**
   ```bash
   # Linux
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
   
   # macOS
   brew install kubectl
   
   # Windows
   choco install kubernetes-cli
   ```

3. **Docker** (já instalado)

## 🚀 Início Rápido

### 1. Iniciar Minikube
```bash
# Iniciar Minikube com configurações otimizadas
minikube start --driver=docker --memory=4096 --cpus=2

# Verificar status
minikube status
```

### 2. Deploy da Aplicação
```bash
# Usar script automatizado
npm run k8s:start

# Ou manualmente
./scripts/deploy-minikube.sh start
```

### 3. Acessar a Aplicação
```bash
# Adicionar entrada no /etc/hosts (Linux/Mac)
echo "$(minikube ip) bikemizer.local" | sudo tee -a /etc/hosts

# Acessar no navegador
open http://bikemizer.local
```

## 🛠️ Comandos Úteis

### Scripts NPM
```bash
npm run k8s:start     # Iniciar aplicação
npm run k8s:stop      # Parar aplicação
npm run k8s:restart   # Reiniciar aplicação
npm run k8s:status    # Ver status
npm run k8s:logs      # Ver logs
npm run k8s:dashboard # Abrir dashboard
npm run k8s:tunnel    # Iniciar tunnel
```

### Comandos kubectl
```bash
# Ver pods
kubectl get pods

# Ver serviços
kubectl get services

# Ver ingress
kubectl get ingress

# Ver logs
kubectl logs -f deployment/bikemizer-app

# Executar comando no pod
kubectl exec -it <pod-name> -- sh

# Descrever recursos
kubectl describe pod <pod-name>
kubectl describe service bikemizer-service
```

### Comandos Minikube
```bash
# Status do cluster
minikube status

# IP do cluster
minikube ip

# Dashboard
minikube dashboard

# Tunnel para acesso externo
minikube tunnel

# Parar cluster
minikube stop

# Deletar cluster
minikube delete
```

## 📊 Monitoramento

### Dashboard do Minikube
```bash
# Abrir dashboard
minikube dashboard

# Ou usar script
npm run k8s:dashboard
```

### Health Check
```bash
# Verificar saúde da aplicação
curl http://bikemizer.local/health

# Ou usando IP do Minikube
curl http://$(minikube ip)/health
```

### Logs
```bash
# Logs em tempo real
kubectl logs -f deployment/bikemizer-app

# Logs de um pod específico
kubectl logs <pod-name>

# Logs com timestamps
kubectl logs -f deployment/bikemizer-app --timestamps
```

## 🔧 Configurações

### Namespace
```bash
# Criar namespace
kubectl apply -f k8s/namespace.yaml

# Usar namespace
kubectl config set-context --current --namespace=bikemizer
```

### ConfigMap e Secrets
```bash
# Aplicar configurações
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml

# Ver configurações
kubectl get configmap bikemizer-config -o yaml
kubectl get secret bikemizer-secrets -o yaml
```

### PersistentVolume
```bash
# Ver volumes persistentes
kubectl get pv
kubectl get pvc

# Descrever PVC
kubectl describe pvc bikemizer-uploads-pvc
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Pod não inicia**
   ```bash
   # Verificar eventos
   kubectl get events --sort-by=.metadata.creationTimestamp
   
   # Descrever pod
   kubectl describe pod <pod-name>
   ```

2. **Imagem não encontrada**
   ```bash
   # Verificar se Docker está configurado para Minikube
   eval $(minikube docker-env)
   
   # Rebuild da imagem
   docker build -t bikemizer-app:latest .
   ```

3. **Ingress não funciona**
   ```bash
   # Verificar se Ingress está habilitado
   minikube addons list | grep ingress
   
   # Habilitar Ingress
   minikube addons enable ingress
   ```

4. **DNS não resolve**
   ```bash
   # Verificar /etc/hosts
   cat /etc/hosts | grep bikemizer
   
   # Adicionar entrada
   echo "$(minikube ip) bikemizer.local" | sudo tee -a /etc/hosts
   ```

### Logs de Debug
```bash
# Logs do Ingress
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller

# Logs do Minikube
minikube logs

# Status detalhado
kubectl get all -o wide
```

## 📈 Escalabilidade

### Horizontal Pod Autoscaler
```bash
# Ver HPA
kubectl get hpa

# Descrever HPA
kubectl describe hpa bikemizer-hpa

# Testar escalabilidade
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh
# Dentro do pod: while true; do wget -q -O- http://bikemizer-service; done
```

### Scaling Manual
```bash
# Escalar deployment
kubectl scale deployment bikemizer-app --replicas=5

# Ver pods
kubectl get pods -l app=bikemizer
```

## 🔒 Segurança

### RBAC (Role-Based Access Control)
```bash
# Ver permissões
kubectl auth can-i create pods
kubectl auth can-i delete pods

# Ver roles
kubectl get roles
kubectl get rolebindings
```

### Network Policies
```bash
# Aplicar política de rede
kubectl apply -f k8s/network-policy.yaml

# Ver políticas
kubectl get networkpolicies
```

## 🧹 Limpeza

### Parar Aplicação
```bash
# Parar aplicação
npm run k8s:stop

# Ou manualmente
kubectl delete -f k8s/
```

### Limpar Minikube
```bash
# Parar Minikube
minikube stop

# Deletar cluster
minikube delete

# Limpar Docker
docker system prune -a
```

## 📚 Próximos Passos

1. **Configurar Helm** para gerenciamento de pacotes
2. **Implementar CI/CD** com GitHub Actions
3. **Adicionar monitoramento** com Prometheus/Grafana
4. **Configurar logs centralizados** com ELK Stack
5. **Implementar backup** de volumes persistentes
6. **Adicionar testes** de carga e stress
7. **Configurar SSL/TLS** com cert-manager

---

🎉 **Parabéns!** Você agora tem uma aplicação rodando em Kubernetes com Minikube!
