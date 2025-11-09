const colors = {
  // Cores base do tema escuro
  background: "#0d0d0d", // Fundo: preto escuro
  text: "#FAFAFA", // Texto: branco
  card: "#141414", // Cards: cinza muito escuro
  secondary: "#262626", // Secondary: cinza escuro
  muted: "#1F1F1F", // Muted: cinza muito escuro
  mutedText: "#999999", // Muted Text: cinza médio
  border: "#2E2E2E", // Bordas: cinza escuro

  // Cores de destaque
  primary: "#F5C842", // Primary: Amarelo/Dourado
  primary_light: "#F5C8422d", // Primary Light: Amarelo claro
  accent: "#DC2626", // Accent/Destructive: Vermelho
  accent_light: "#DC26262d", // Accent Light: Vermelho claro
  success: "#16A34A", // Success: Verde
} as const;

export const fontFamily = {
  sans: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semiBold: "Inter_600SemiBold",
  },
} as const;

const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  "2xl": 28,
  "3xl": 32,
} as const;

export const theme = {
  colors,
  fontFamily,
  fontSize,
} as const;
