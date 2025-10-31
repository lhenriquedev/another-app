import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    borderRadius: 10,
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  header: {},
  cardContainer: {
    paddingHorizontal: 16,
    gap: 6,
    flexDirection: 'row',
  },
});
