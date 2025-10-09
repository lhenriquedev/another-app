import { View } from "react-native";
import { styles } from "./styles";
import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";

interface ProfileCardBeltProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string | number | null;
}

export function ProfileCardBelt({
  icon,
  subtitle,
  title,
}: ProfileCardBeltProps) {
  return (
    <View style={styles.profileCardBelt}>
      <View style={styles.profileCardIcon}>{icon}</View>

      <AppText style={{ color: theme.colors.platinum[800] }}>{title}</AppText>

      <View
        style={{
          height: 10,
          backgroundColor: theme.colors.white[700],
          borderRadius: 10,
          marginVertical: 12,
        }}
      >
        <View
          style={{
            width: "56%",
            maxWidth: "100%",
            height: 10,
            borderRadius: 10,
            backgroundColor: theme.colors.black[800],
          }}
        />
      </View>

      <AppText size="base" weight="semiBold">
        {subtitle}
      </AppText>
    </View>
  );
}
