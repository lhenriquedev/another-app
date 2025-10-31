import { TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";

interface IOptionSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  options: {
    value: string;
    icon: string;
    title: string;
  }[];
  isRow?: boolean;
  fullWidth?: boolean;
}

export function OptionsSelector({
  options,
  value,
  isRow = false,
  fullWidth = false,
  onChange,
}: IOptionSelectorProps) {
  return (
    <View style={[styles.container, isRow ? { flexDirection: "row" } : {}]}>
      {options.map((option) => (
        <TouchableOpacity
          style={[
            styles.option,
            option.value === value
              ? {
                  backgroundColor: theme.colors.secondary,
                  borderColor: theme.colors.primary,
                }
              : {},
            fullWidth ? { flex: 1 } : {},
          ]}
          key={option.value}
          onPress={() => onChange?.(option.value)}
        >
          <View style={styles.icon}>
            <AppText>{option.icon}</AppText>
          </View>
          <View>
            <AppText weight="semiBold">{option.title}</AppText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
