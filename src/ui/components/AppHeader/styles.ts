import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: theme.colors.white[400],
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.white[700],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
