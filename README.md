# 🚴 BikeMizer - Sistema de Customização de Bicicletas (Arquitetura SOLID)

Uma aplicação web moderna para customização de bicicletas construída com **React + TypeScript** seguindo os **princípios SOLID** e **Clean Architecture**.

## ✨ **Funcionalidades**

- **Customização de Cores**: Sistema de cores predefinidas e personalizadas
- **Sistema de Adesivos**: Adesivos padrão + upload de imagens personalizadas
- **Tipos de Bicicleta**: Road, Mountain, City e BMX
- **Múltiplos Tamanhos**: Pequeno, Médio e Grande
- **Visualização em Tempo Real**: Canvas HTML5 com renderização instantânea
- **Galeria de Criações**: Salvar e compartilhar customizações
- **Interface Responsiva**: Design mobile-first com Tailwind CSS
- **Arquitetura SOLID**: Código limpo, testável e manutenível
- **🆕 Sistema de Histórico**: Salvar, comparar e restaurar versões
- **🆕 Estatísticas Avançadas**: Métricas e insights de customização
- **🆕 Comparação Visual**: Comparar versões lado a lado
- **🆕 Sistema de Favoritos**: Marcar versões preferidas

## 🏗️ **Arquitetura SOLID**

### **S** - Single Responsibility Principle
- Cada classe/componente tem uma única responsabilidade
- `BikeService` só gerencia bicicletas
- `BikeValidator` só valida dados
- `Button` só renderiza botões

### **O** - Open/Closed Principle
- Fácil de estender sem modificar código existente
- Novas variantes de botões sem alterar a classe base
- Novos tipos de validação sem modificar validadores existentes

### **L** - Liskov Substitution Principle
- Interfaces bem definidas permitem substituição
- `BikeService` implementa `IBikeService`
- Diferentes implementações podem ser injetadas

### **I** - Interface Segregation Principle
- Interfaces pequenas e específicas
- `BikeService` e `StickerService` separados
- Hooks específicos para diferentes funcionalidades

### **D** - Dependency Inversion Principle
- Dependências de abstrações, não implementações
- Stores dependem de interfaces de serviços
- Componentes dependem de props tipadas

## 🛠️ **Stack Tecnológica**

### **Frontend**
- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Framer Motion** para animações
- **React Router** para navegação

### **Estado e Gerenciamento**
- **Zustand** para state management
- **React Query** para cache e sincronização
- **React Hook Form** para formulários

### **Validação e Utilitários**
- **Class Validator** para validação
- **Axios** para requisições HTTP
- **CLSX + Tailwind Merge** para classes CSS

### **Desenvolvimento**
- **ESLint** + **Prettier** para qualidade de código
- **Vitest** para testes unitários
- **TypeScript** com configuração strict

## 📁 **Estrutura do Projeto**

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── ui/             # Componentes de UI base (Button, Input, etc.)
│   ├── layout/         # Componentes de layout (Header, Footer)
│   └── bike/           # Componentes específicos de bicicletas
├── hooks/              # Custom hooks React
├── services/           # Lógica de negócio e APIs
├── stores/             # Gerenciamento de estado (Zustand)
├── types/              # Definições TypeScript
├── utils/              # Utilitários e helpers
├── validators/         # Validação de dados
├── pages/              # Páginas da aplicação
└── layouts/            # Layouts compartilhados
```

## 🚀 **Instalação e Uso**

### **Pré-requisitos**
- Node.js 18+
- npm ou yarn

### **Instalação**
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd bikemizer

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### **Scripts Disponíveis**
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview da build
- `npm run lint` - Verificar qualidade do código
- `npm run lint:fix` - Corrigir problemas de linting
- `npm run test` - Executar testes
- `npm run type-check` - Verificar tipos TypeScript
- `npm run start` - Iniciar servidor Node.js

#### **Docker**
- `npm run docker:build` - Build da imagem Docker
- `npm run docker:run` - Executar container Docker
- `npm run docker:up` - Executar com Docker Compose

#### **Kubernetes**
- `npm run k8s:start` - Iniciar no Minikube
- `npm run k8s:stop` - Parar aplicação
- `npm run k8s:restart` - Reiniciar aplicação
- `npm run k8s:status` - Ver status
- `npm run k8s:logs` - Ver logs
- `npm run k8s:dashboard` - Dashboard Minikube
- `npm run k8s:tunnel` - Tunnel para acesso externo

## 🐳 **DevOps e Deploy**

### **Conceitos DevOps Implementados**

Este projeto inclui uma estrutura DevOps completa para aprendizado prático:

- **CI/CD Pipeline** com GitHub Actions
- **Containerização** com Docker
- **Orquestração** com Docker Compose
- **Automação** de testes e build

### **Pipeline CI/CD**

O pipeline automático executa:
1. **Checkout** do código
2. **Setup** do Node.js
3. **Instalação** de dependências
4. **Type Check** TypeScript
5. **Lint** do código
6. **Testes** unitários
7. **Build** da aplicação
8. **Upload** de artefatos

### **Docker**

#### **Dockerfile Simplificado**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN mkdir -p /app/dist/uploads
EXPOSE 3000
CMD ["node", "server.js"]
```

#### **Docker Compose**
```yaml
version: '3.8'
services:
  bikemizer-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - ./public/uploads:/app/dist/uploads
    restart: unless-stopped
```

### **Comandos Docker**

```bash
# Build da imagem
npm run docker:build

# Executar container
npm run docker:run

# Executar com Docker Compose
npm run docker:up

# Comandos Docker diretos
docker build -t bikemizer-app .
docker run -p 3000:3000 bikemizer-app
docker-compose up --build
```

### **Variáveis de Ambiente**

Copie `env.example` para `.env` e configure:

```env
# Ambiente
NODE_ENV=development
PORT=3000

# Upload de arquivos
UPLOAD_MAX_SIZE=10485760
UPLOAD_PATH=./public/uploads

# CORS
CORS_ORIGIN=http://localhost:3000
```

### **Deploy**

#### **Desenvolvimento Local**
```bash
# Com Node.js
npm run dev

# Com Docker
npm run docker:up
```

#### **Produção**
```bash
# Build e deploy
npm run build
npm run start

# Com Docker
npm run docker:build
npm run docker:run
```

### **Monitoramento**

O projeto inclui endpoint de health check:
```bash
curl http://localhost:3000/health
```

Resposta:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "memory": { "rss": 123456, "heapTotal": 123456, "heapUsed": 123456 },
  "version": "2.0.0"
}
```

### **Estrutura DevOps**

```
bikemizer/
├── .github/workflows/ci.yml     # Pipeline CI/CD
├── Dockerfile                   # Containerização
├── docker-compose.yml          # Orquestração local
├── .dockerignore               # Otimização Docker
├── env.example                 # Variáveis de ambiente
├── k8s/                        # Configurações Kubernetes
│   ├── namespace.yaml          # Namespace isolado
│   ├── configmap.yaml          # Configurações
│   ├── secret.yaml             # Dados sensíveis
│   ├── deployment.yaml         # Deployment + Service + PVC
│   ├── ingress.yaml            # Acesso externo
│   └── hpa.yaml               # Auto-scaling
├── scripts/
│   └── deploy-minikube.sh      # Script de deploy Minikube
└── MINIKUBE.md                 # Guia Minikube
```

### **Kubernetes com Minikube**

#### **Configuração Completa**
- **Deployment** com 2 replicas
- **Service** ClusterIP para comunicação interna
- **Ingress** com NGINX para acesso externo
- **ConfigMap** para configurações
- **Secret** para dados sensíveis
- **PersistentVolumeClaim** para uploads
- **HorizontalPodAutoscaler** para escalabilidade

#### **Comandos Kubernetes**
```bash
# Scripts automatizados
npm run k8s:start     # Iniciar no Minikube
npm run k8s:stop      # Parar aplicação
npm run k8s:status    # Ver status
npm run k8s:logs      # Ver logs
npm run k8s:dashboard # Dashboard Minikube

# Comandos kubectl
kubectl get pods
kubectl get services
kubectl get ingress
kubectl logs -f deployment/bikemizer-app
```

#### **Acesso à Aplicação**
```bash
# URL local
http://bikemizer.local

# Via IP do Minikube
http://$(minikube ip)

# Health check
curl http://bikemizer.local/health
```

#### **Estrutura Kubernetes**
```
k8s/
├── namespace.yaml      # Namespace isolado
├── configmap.yaml      # Configurações
├── secret.yaml         # Dados sensíveis
├── deployment.yaml     # Deployment + Service + PVC
├── ingress.yaml        # Acesso externo
└── hpa.yaml           # Auto-scaling
```

### **Próximos Passos DevOps**

1. **Configurar secrets** no GitHub
2. **Implementar banco de dados** (PostgreSQL)
3. **Adicionar cache** (Redis)
4. **Configurar monitoramento** (Prometheus/Grafana)
5. **Implementar logs centralizados** (ELK Stack)
6. **Configurar SSL/TLS**
7. **Implementar backup automático**
8. **Configurar Helm** para gerenciamento de pacotes
9. **Implementar CI/CD** com GitHub Actions
10. **Adicionar testes** de carga e stress

## 🎨 **Componentes Principais**

### **BikeCustomizer**
- Renderização em Canvas HTML5
- Sistema de cores e adesivos
- Configurações de tipo e tamanho

### **ColorPicker**
- Paleta de cores predefinidas
- Seletor de cor personalizada
- Validação de formato hexadecimal

### **StickerManager**
- Galeria de adesivos padrão
- Upload de imagens personalizadas
- Posicionamento e redimensionamento

### **BikeGallery**
- Visualização de criações salvas
- Filtros por tipo, tamanho e cor
- Sistema de busca e categorização

### **🆕 CustomizationHistory**
- Sistema completo de histórico de versões
- Lista cronológica com previews
- Controles de favoritos e exclusão
- Restauração de versões anteriores

### **🆕 CustomizationStats**
- Estatísticas detalhadas de uso
- Métricas de cores e tipos populares
- Progresso de versões com insights
- Análise de comportamento do usuário

### **🆕 useCustomizationHistory**
- Hook personalizado para gerenciar histórico
- Lógica de comparação entre versões
- Cálculos de estatísticas otimizados
- Gerenciamento de estado persistente

## 🔧 **Configuração**

### **Variáveis de Ambiente**
```env
VITE_API_URL=http://localhost:3000/api
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
```

### **Tailwind CSS**
- Tema personalizado com cores primárias
- Animações customizadas
- Componentes utilitários

### **TypeScript**
- Configuração strict mode
- Path aliases para imports
- Tipos rigorosos para todas as entidades

## 🧪 **Testes**

### **Estrutura de Testes**
```bash
src/
├── __tests__/          # Testes unitários
├── components/         # Testes de componentes
├── services/           # Testes de serviços
└── utils/              # Testes de utilitários
```

### **Executar Testes**
```bash
npm run test           # Executar todos os testes
npm run test:ui        # Interface visual para testes
npm run test:coverage  # Relatório de cobertura
```

## 📱 **Responsividade**

- **Mobile First** design
- **Breakpoints** otimizados
- **Touch-friendly** para dispositivos móveis
- **Performance** otimizada para diferentes dispositivos

## 🚀 **Performance**

- **Code Splitting** automático
- **Lazy Loading** de componentes
- **Memoização** com React.memo e useMemo
- **Bundle** otimizado com Vite

## 🔒 **Segurança**

- **Validação** rigorosa de inputs
- **Sanitização** de dados
- **Type Safety** com TypeScript
- **CORS** configurado adequadamente

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature
3. Implemente seguindo os princípios SOLID
4. Adicione testes para novas funcionalidades
5. Abra um Pull Request

### **Padrões de Código**
- Siga os princípios SOLID
- Use TypeScript strict mode
- Mantenha cobertura de testes alta
- Documente APIs e componentes

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🔮 **Roadmap**

- [ ] **Sistema de Usuários**: Autenticação e perfis
- [ ] **Banco de Dados**: Persistência de dados
- [ ] **API REST**: Backend robusto
- [ ] **Real-time**: WebSockets para colaboração
- [ ] **PWA**: Progressive Web App
- [ ] **Mobile App**: React Native
- [ ] **AI Integration**: Sugestões inteligentes
- [ ] **3D Rendering**: Visualização 3D das bicicletas

## ❓ **FAQ DevOps**

### **Por que usar containers?**
R: Containers garantem consistência entre ambientes (dev/prod), isolamento da aplicação e facilidade de deploy.

### **O que é um pipeline CI/CD?**
R: É uma sequência automatizada de etapas que executa testes, build e deploy sempre que há mudanças no código.

### **Como funciona o Docker Compose?**
R: O Docker Compose permite definir e executar múltiplos containers com um único comando, ideal para desenvolvimento local.

### **O que é Kubernetes?**
R: Kubernetes é uma plataforma de orquestração de containers que automatiza deploy, escalabilidade e gerenciamento de aplicações.

### **Por que usar Minikube?**
R: Minikube permite executar Kubernetes localmente para desenvolvimento e aprendizado, sem precisar de um cluster completo.

### **O que é o endpoint /health?**
R: É um endpoint de monitoramento que retorna o status da aplicação, usado por load balancers e ferramentas de monitoramento.

### **Como configurar deploy automático?**
R: Configure os secrets no GitHub (VERCEL_TOKEN, NETLIFY_AUTH_TOKEN) e o pipeline fará deploy automático na branch main.

### **Qual a diferença entre desenvolvimento e produção?**
R: Desenvolvimento usa `npm run dev` com hot reload, produção usa `npm run build` + `npm run start` ou Docker/Kubernetes.

### **Como escalar a aplicação no Kubernetes?**
R: Use `kubectl scale deployment bikemizer-app --replicas=5` ou configure HPA para escalabilidade automática.

### **Como acessar a aplicação no Minikube?**
R: Use `http://bikemizer.local` após configurar o /etc/hosts ou `http://$(minikube ip)` diretamente.

---

**Desenvolvido com ❤️ seguindo princípios SOLID, Clean Architecture e DevOps**
