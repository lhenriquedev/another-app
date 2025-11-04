import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { View } from "react-native";
import { styles } from "./styles";

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
        <AppText style={{ color: theme.colors.mutedText }}>{title}</AppText>
        <AppText size="xl" weight="semiBold">
          {subtitle}
        </AppText>
      </View>
    </View>
  );
}
