import { AppText } from "@ui/components/AppText";
import { View } from "react-native";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";

interface ProfileCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string | number;
}

export function ProfileCard({ icon, subtitle, title }: ProfileCardProps) {
  return (
    <View style={styles.profileCardContent}>
      <View style={styles.profileCardIcon}>{icon}</View>

      <View>
        <AppText style={{ color: theme.colors.platinum[800] }}>{title}</AppText>
        <AppText size="2xl" weight="semiBold">
          {subtitle}
        </AppText>
      </View>
    </View>
  );
}
