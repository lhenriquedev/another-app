import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.platinum.DEFAULT,
    borderRadius: 10,
    padding: 16,
    marginRight: 16,
    width: 280,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  capacity: {
    alignItems: 'center',
  },
});
