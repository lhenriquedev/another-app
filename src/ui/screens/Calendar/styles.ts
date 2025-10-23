import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white[400],
  },
  homeHeader: {
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white[400],
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.white[700],
  },
  homeHeaderContent: {
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeHeaderImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
});
