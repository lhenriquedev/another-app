import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  header: {
    gap: 8,
    paddingHorizontal: 16,
  },
  title: {
    letterSpacing: -0.32,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  content: {
    gap: 16,
    flex: 1,
    paddingBottom: 32,
    paddingHorizontal: 16,
    justifyContent: "flex-end",
  },
  footer: {
    paddingHorizontal: 16,
  },
});
