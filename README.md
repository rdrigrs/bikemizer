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

---

**Desenvolvido com ❤️ seguindo princípios SOLID e Clean Architecture**
