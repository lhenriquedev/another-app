import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  bottomSheetContainer: {
    gap: 16,
    padding: 16,
    flex: 1,
  },
  classItem: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    gap: 8,
    backgroundColor: theme.colors.white[500],
    borderRadius: 4,
    shadowColor: theme.colors.black[700],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    borderLeftWidth: 4,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: theme.colors.platinum.DEFAULT,
  },
  cardWrapper: {
    flexDirection: 'row',
    marginBottom: 12,

  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  category: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.white[700],
  },
  pressed: {
    opacity: 0.6,
  },
});
