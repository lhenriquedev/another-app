import { theme } from "@ui/styles/theme";
import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  header: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 72,
    justifyContent: 'center',
    width: screenWidth * 0.8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacing: {
    height: 4,
  },
});
