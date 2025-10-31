import { AppText } from "@ui/components/AppText";
import { View } from "react-native";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";

interface ProfileActivityCardProps {
  title: string
  day: string
  hour: string
}

export function ProfileActivityCard({ hour, day, title }: ProfileActivityCardProps) {
  return (
    <View style={styles.profileCardActivityContent}>
      <View style={styles.profileCardActivityText}>
        <AppText weight="semiBold">{title}</AppText>
        <AppText size="xs" color={theme.colors.mutedText}>{day}</AppText>
      </View>

      <View style={{
        backgroundColor: theme.colors.secondary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
      }}>
        <AppText weight="semiBold" size="sm">{hour}</AppText>
      </View>
    </View>
  )
}
