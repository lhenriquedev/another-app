import { View } from "react-native";
import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { styles } from "./styles";

export function Settings() {
  return (
    <View style={styles.container}>
      <AppText color={theme.colors.mutedText} size="base">
        Em desenvolvimento...
      </AppText>
    </View>
  );
}
