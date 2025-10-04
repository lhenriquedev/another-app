import { View } from "react-native";
import { AppText } from "../AppText";
import { theme } from "@ui/styles/theme";
import { styles } from "./styles";

export function ClassesList() {
  return (
    <View style={styles.container}>
      <AppText color={theme.colors.black[800]}>Aulas</AppText>
    </View>
  );
}
