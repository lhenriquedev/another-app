import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // marginTop: -30,
    // // padding: 20,
  },
  classesListDatePickerContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  classListCard: {
    backgroundColor: theme.colors.white.DEFAULT,
    borderWidth: 1,
    borderColor: theme.colors.platinum.DEFAULT,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  classListCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bottomSheetContainer: {
    padding: 16,
  },
});
