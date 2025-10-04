import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white.DEFAULT,
  },
  homeHeader: {
    height: 140,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.black.DEFAULT,
  },
  homeHeaderContent: {
    flexDirection: 'row',
    gap: 12,
  },
  homeHeaderImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
});
