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
    padding: 16,
  },
  hourRangeGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  hourColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  cardsColumn: {
    flex: 1,
  },
  cardWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardWrapperWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.platinum[600],
    paddingBottom: 16,
    marginBottom: 16,
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center',
    paddingTop: 8,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: theme.colors.white.DEFAULT,
    borderWidth: 3,
    borderColor: theme.colors.black.DEFAULT,
    shadowColor: theme.colors.black.DEFAULT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: theme.colors.platinum[600],
    marginTop: 4,
  },
  classItem: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.white[400],
    borderRadius: 10,
    shadowColor: theme.colors.black[700],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    borderLeftWidth: 4,
  },
  classItemPressed: {
    opacity: 0.7,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  classMainInfo: {
    flex: 1,
    marginRight: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  classDetails: {
    gap: 4,
    // marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 6,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
    width: 20,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  instructor: {
    fontSize: 14,
    color: '#666',
  },
});
