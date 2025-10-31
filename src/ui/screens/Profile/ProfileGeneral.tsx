import {
  // Calendar,
  // ChartNoAxesColumnIncreasing,
  Target,
  User,
} from "lucide-react-native";
import { Platform, ScrollView, View } from "react-native";
import { ProfileCard } from "./ProfileCard";
import { styles } from "./styles";
// import { ProfileCardBelt } from "./ProfileBelt";
import { useAuth } from "@app/contexts/AuthContext";
import { BELTS, BeltType } from "@app/hooks/useBelts";
import { theme } from "@ui/styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileActivity } from "./ProfileActivity";

export function ProfileGeneral() {
  const { user } = useAuth();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: Platform.OS === "android" ? 32 : 0,
        paddingBottom: bottom,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.profileGeneral}>
        <View style={styles.profileCardContainer}>
          <ProfileCard
            icon={<Target color={theme.colors.background} />}
            title="Total de Check-ins"
            subtitle={user?.totalCheckins}
          />
          <ProfileCard
            icon={<User color={theme.colors.background} />}
            title="Faixa atual"
            subtitle={BELTS[user?.belt as BeltType]}
          />
        </View>
        <View>
          <ProfileActivity />
        </View>
      </View>
    </ScrollView>
  );
}
