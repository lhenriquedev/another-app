import { AppText } from "../AppText";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";
import { TouchableOpacity, View } from "react-native";

export function ClassesListDatePicker() {
  return (
    <View style={styles.classesListDatePickerContainer}>
      <TouchableOpacity>
        <ChevronLeft size={32} />
      </TouchableOpacity>

      <TouchableOpacity>
        <AppText
          style={{ textTransform: "uppercase" }}
          weight="medium"
          color={theme.colors.platinum[900]}
        >
          Hoje, 12 de Julho
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity>
        <ChevronRight size={32} />
      </TouchableOpacity>
    </View>
  );
}
