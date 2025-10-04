const colors = {
  black: {
    DEFAULT: '#000000', // Preto puro
    600: '#1A1A1A',     // Preto levemente suavizado - mais confortável para os olhos
    700: '#0D0D0D',     // Quase preto, mantém a intensidade
    800: '#000000',     // Mantive igual ao DEFAULT já que não tem como escurecer mais
  },

  white: {
    DEFAULT: '#FEFEFE', // Seu branco quase puro
    600: '#F0F0F0',     // Off-white com mais corpo
    700: '#E0E0E0',     // Cinza muito claro
    800: '#D0D0D0',     // Para quando você precisa de contraste no branco
  },

  platinum: {
    DEFAULT: '#E8E8E8', // Cinza claro original
    600: '#D0D0D0',     // Cinza claro médio
    700: '#B8B8B8',     // Cinza mais presente
    800: '#A0A0A0',     // Cinza médio, bom para texto secundário
  },
  support: {
    red: '#EF4444',
  },
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
