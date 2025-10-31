import { theme } from "@ui/styles/theme";
import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

export const styles = {
  ...StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 8,
      height: 72,
      justifyContent: 'center' as const,
    },
    content: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
    },
    capacity: {
      alignItems: 'center' as const,
    },
  }),
  getWidth: (totalItems: number) => ({
    width: totalItems === 1 ? screenWidth - 32 : screenWidth * 0.8,
  }),
};
