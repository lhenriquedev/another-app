# Another App

Aplicativo mobile desenvolvido com React Native e Expo, focado em fornecer uma experiência de autenticação moderna e intuitiva.

## 📋 Descrição

Another App é uma aplicação mobile que implementa um sistema completo de autenticação de usuários, incluindo cadastro, login e ativação de conta. O projeto utiliza as melhores práticas de desenvolvimento React Native com TypeScript e um sistema de design robusto.

## ✨ Funcionalidades

- **Tela de Boas-vindas**: Interface atrativa com imagem de fundo e apresentação do aplicativo
- **Autenticação de Usuários**:
  - Login com e-mail e senha
  - Cadastro de novos usuários
  - Fluxo de ativação de conta em duas etapas
- **Bottom Sheets**: Modais interativos para formulários de autenticação
- **Design System**: Sistema de design consistente com tema customizado
- **Tipografia**: Fonte Inter com pesos variados (Regular, Medium, SemiBold)

## 🛠️ Tecnologias

### Core
- **React Native** `0.81.4` - Framework para desenvolvimento mobile
- **React** `19.1.0` - Biblioteca JavaScript para construção de interfaces
- **Expo** `~54.0.10` - Plataforma para desenvolvimento React Native
- **TypeScript** `~5.9.2` - Superset JavaScript com tipagem estática

### UI & Design
- **@gorhom/bottom-sheet** `^5.2.6` - Componente de bottom sheet nativo
- **react-native-gesture-handler** `~2.28.0` - Gerenciamento de gestos
- **react-native-reanimated** `~4.1.1` - Biblioteca de animações performáticas
- **react-native-safe-area-context** `5.4.0` - Gestão de áreas seguras do dispositivo
- **@expo-google-fonts/inter** `^0.4.2` - Fonte Inter do Google Fonts

### Ferramentas de Desenvolvimento
- **ESLint** `^9.36.0` - Linter para qualidade de código
- **TypeScript ESLint** `^8.45.0` - Plugin ESLint para TypeScript

## 📁 Estrutura do Projeto

```
another-app/
├── assets/                      # Recursos estáticos (imagens, ícones)
├── src/
│   ├── ui/                      # Camada de interface do usuário
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── AppText.tsx      # Componente de texto customizado
│   │   │   ├── Button/          # Componente de botão
│   │   │   ├── FormGroup/       # Grupo de formulário
│   │   │   ├── Input/           # Campo de entrada
│   │   │   ├── SignInBottomSheet/           # Modal de login
│   │   │   └── SignUpAndActivateAccountBottomSheet/  # Modal de cadastro
│   │   ├── screens/             # Telas da aplicação
│   │   │   └── Welcome/         # Tela de boas-vindas
│   │   ├── styles/              # Estilos e tema
│   │   │   ├── theme/           # Definições de tema
│   │   │   └── utils/           # Utilidades de estilo
│   │   └── App.tsx              # Componente raiz da aplicação
│   └── index.d.ts               # Declarações de tipos
├── app.json                     # Configuração do Expo
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configuração do TypeScript
└── index.ts                     # Ponto de entrada da aplicação
```

## 🎨 Design System

### Cores

O aplicativo utiliza uma paleta de cores neutras e modernas:

- **dimGray**: `#6A6A6A` - Texto secundário e elementos neutros
- **seasalt**: `#F8F8F8` - Backgrounds sutis
- **black**: `#000000` - Texto principal
- **white**: `#FEFEFE` - Fundos claros
- **platinum**: `#E8E8E8` - Elementos de interface
- **support.red**: `#EF4444` - Erros e alertas

Cada cor possui variantes (600, 700, 800) para diferentes níveis de intensidade.

### Tipografia

- **Font Family**: Inter
  - Regular (400)
  - Medium (500)
  - SemiBold (600)

- **Tamanhos**:
  - xs: 12px
  - sm: 14px
  - base: 16px
  - lg: 20px
  - xl: 24px
  - 2xl: 28px
  - 3xl: 32px

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo físico com Expo Go ou emulador Android/iOS

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd another-app
```

2. Instale as dependências:
```bash
npm install
```

### Executar o Projeto

- **Iniciar o servidor de desenvolvimento**:
```bash
npm start
```

- **Executar no Android**:
```bash
npm run android
```

- **Executar no iOS**:
```bash
npm run ios
```

- **Verificação de tipos**:
```bash
npm run typecheck
```

## 📱 Plataformas Suportadas

- **iOS**: Suporte para iPad e iPhone
- **Android**: Suporte completo com adaptive icons
- **Web**: Suporte experimental

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura organizada em camadas:

- **UI Layer** (`src/ui/`): Componentes visuais, telas e estilos
- **Path Aliases**: Configurados para facilitar importações
  - `@ui/*` → `./src/ui/*`
  - `@app/*` → `./src/app/*`

### Componentes Principais

#### Welcome Screen (`src/ui/screens/Welcome/index.tsx`)
Tela inicial que apresenta o aplicativo com:
- Imagem de fundo
- Logo da aplicação
- Botões de ação (Criar conta / Login)
- Integração com bottom sheets de autenticação

#### SignInBottomSheet
Modal de login com campos de e-mail e senha, incluindo:
- Validação de entrada
- Navegação entre campos
- Submit com enter

#### SignUpAndActivateAccountBottomSheet
Fluxo de cadastro em duas etapas:
1. **SignUpForm**: Formulário de registro
2. **ActivateAccountForm**: Validação e ativação da conta

## 🔧 Configurações Especiais

### Expo Config (`app.json`)

- **New Architecture Enabled**: Utiliza a nova arquitetura do React Native
- **Edge-to-Edge**: Interface de borda a borda no Android
- **Bundle Identifiers**:
  - iOS: `com.kazama-24.anotherapp`
  - Android: `com.kazama_24.anotherapp`

### TypeScript

- Modo strict habilitado
- Path aliases configurados
- Extends configuração base do Expo

## 📄 Licença

Este projeto é privado e não possui licença pública.

## 👤 Autor

**kazama-24**

## 🤝 Contribuindo

Este é um projeto privado. Contribuições não são aceitas no momento.

---

**Versão**: 1.0.0
