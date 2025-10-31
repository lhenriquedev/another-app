import { theme } from '@ui/styles/theme';
import { createVariants } from '@ui/styles/utils/createVariant';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {},
});

export const inputStyles = createVariants({
  base: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: theme.fontFamily.sans.regular,
    color: theme.colors.text,
  },
  variants: {
    status: {
      default: {
        borderColor: theme.colors.border,
      },
      focus: {
        borderColor: theme.colors.primary,
      },
      error: {
        borderColor: theme.colors.accent,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
      false: {
        opacity: 1,
      },
    },
  },
  defaultVariants: {
    status: 'default',
    disabled: 'false',
  },
});
