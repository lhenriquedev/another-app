const colors = {
  black: {
    DEFAULT: '#000000', // Preto puro
    500: '#323233',
    600: '#1A1A1A',     // Preto levemente suavizado - mais confortável para os olhos
    700: '#0D0D0D',     // Quase preto, mantém a intensidade
    800: '#000000',     // Mantive igual ao DEFAULT já que não tem como escurecer mais
  },

  white: {
    DEFAULT: '#f6f6f6', // Seu branco quase puro
    400: '#FFFFFF',
    500: '#f5f4f4',     // Off-white com mais corpo
    600: '#f6f6f6',
    700: '#E0E0E0',     // Cinza muito claro
    800: '#D0D0D0',     // Para quando você precisa de contraste no branco
  },

  platinum: {
    DEFAULT: '#E4E4E7', // Cinza claro original
    600: '#D0D0D0',     // Cinza claro médio
    700: '#B8B8B8',     // Cinza mais presente
    800: '#A0A0A0',     // Cinza médio, bom para texto secundário
    900: '#71717A',
  },
  support: {
    red: '#EF4444',
  },
  green: {
    600: '#b9f8cf',
    900: '#073B3A',
  },
  background: '#f8fbfc',
} as const;

export const fontFamily = {
  sans: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
  },
} as const;

const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
} as const;

export const theme = {
  colors,
  fontFamily,
  fontSize,
} as const;
