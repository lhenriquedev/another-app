import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  containerHorizontal: {
    flexDirection: "row",
  },
  item: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "solid",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  horizontalItem: {
    flexDirection: "column",
    paddingVertical: 32,
    flex: 1,
  },
  icon: {
    backgroundColor: theme.colors.primary_light,
    borderRadius: 6,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  errorItem: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accent_light,
  },
  selectedItem: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary_light,
  },
  selectedIcon: {
    backgroundColor: theme.colors.border,
  },
});
