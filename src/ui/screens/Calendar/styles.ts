import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  homeHeader: {
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white[500],
    marginBottom: 32,
  },
  homeHeaderContent: {
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  homeHeaderImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
});
