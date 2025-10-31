import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
