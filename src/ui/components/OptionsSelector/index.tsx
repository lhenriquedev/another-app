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
}

export function OptionsSelector({
  options,
  value,
  onChange,
}: IOptionSelectorProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          style={[
            styles.option,
            option.value === value
              ? {
                  backgroundColor: theme.colors.white[600],
                  borderColor: theme.colors.black.DEFAULT,
                }
              : {},
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
