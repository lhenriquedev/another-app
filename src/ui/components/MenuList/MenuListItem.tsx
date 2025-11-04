import { theme } from "@ui/styles/theme";
import { ChevronRight, LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";

interface IMenuListItemProps {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  variant?: "default" | "danger";
  isLast?: boolean;
}

export function MenuListItem({
  icon: Icon,
  label,
  onPress,
  variant = "default",
  isLast = false,
}: IMenuListItemProps) {
  const iconColor =
    variant === "danger" ? theme.colors.accent : theme.colors.primary;
  const textColor =
    variant === "danger" ? theme.colors.accent : theme.colors.text;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        isLast && styles.menuItemLast,
        pressed && { backgroundColor: theme.colors.muted },
      ]}
      onPress={onPress}
      android_ripple={{ color: theme.colors.muted }}
    >
      <View style={styles.menuItemLeft}>
        <Icon size={20} color={iconColor} />
        <AppText color={textColor} size="base">
          {label}
        </AppText>
      </View>
      <ChevronRight size={20} color={theme.colors.mutedText} />
    </Pressable>
  );
}
