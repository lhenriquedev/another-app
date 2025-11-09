import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.background,
  },
  progressBarBackground: {
    backgroundColor: theme.colors.primary_light,
    flex: 1,
    height: 4,
    borderRadius: 4,
  },
  progressBarForeground: {
    backgroundColor: theme.colors.primary,
    height: "100%",
    borderRadius: 4,
  },
  rightActionPlaceholder: {
    width: 40,
    height: 40,
  },
});
