import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    // flex: 1,
    padding: 16,
    // paddingBottom: 32,
  },
  // emptyContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 32,
  // },
  // emptyText: {
  //   fontSize: 64,
  //   marginBottom: 16,
  // },
  // emptyTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: '#333',
  //   marginBottom: 8,
  // },
  // emptySubtitle: {
  //   fontSize: 14,
  //   color: '#666',
  //   textAlign: 'center',
  // },
  hourRangeGroup: {
    flexDirection: 'row',
    gap: 8,
    // marginBottom: 16,
  },
  hourColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  hourText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  hourDivider: {
    width: 2,
    height: 12,
    backgroundColor: '#2196F3',
    marginVertical: 4,
  },
  cardsColumn: {
    flex: 1,
  },
  cardWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
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
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  classDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
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
  category: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  capacityBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  capacityBadgeFull: {
    backgroundColor: '#FFEBEE',
  },
  capacity: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  capacityFull: {
    color: '#F44336',
  },
});
