import { LucideIcon } from "lucide-react-native";
import { View, ViewStyle } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";

interface ICardHeaderProps {
  label: string;
  title: string;
}

export function CardHeader({ label, title }: ICardHeaderProps) {
  return (
    <View style={styles.header}>
      <AppText size="xs" color={theme.colors.mutedText}>
        {label}
      </AppText>
      <AppText size="2xl" weight="semiBold">
        {title}
      </AppText>
    </View>
  );
}

interface ICardIconProps {
  Icon: LucideIcon;
  size?: number;
  color: string;
}

export function CardIcon({ Icon, color, size }: ICardIconProps) {
  return (
    <View style={styles.icon}>
      <Icon size={size} color={color} />
    </View>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

export function CardContainer({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.cardContainer, style]}>{children}</View>;
}
