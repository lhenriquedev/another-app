import { View } from "react-native";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";
import { AppText } from "@ui/components/AppText";
import { ProfileActivityCard } from "./ProfileActivityCard";

export function ProfileActivity() {
  return (
    <View style={styles.profileCardContent}>
      <View style={styles.profileCardActivityHeader}>
        <View
          style={{
            width: 4,
            height: 24,
            backgroundColor: theme.colors.black[800],
          }}
        />

        <AppText weight="semiBold">Atividade Recente</AppText>
      </View>

      <View style={styles.profileCardActivityContainer}>
        <ProfileActivityCard title="Competição" day="Ontem" hour="19:30" />
        <ProfileActivityCard title="Competição" day="Ontem" hour="19:30" />
        <ProfileActivityCard title="Competição" day="Ontem" hour="19:30" />
        <ProfileActivityCard title="Competição" day="Ontem" hour="19:30" />
        <ProfileActivityCard title="Competição" day="Ontem" hour="19:30" />
        <ProfileActivityCard title="Competição" day="Ontem" hour="19:30" />
      </View>
    </View>
  );
}
