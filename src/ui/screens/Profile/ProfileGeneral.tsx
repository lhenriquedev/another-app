import { Platform, ScrollView, View } from "react-native";
import { ProfileCard } from "./ProfileCard";
import { styles } from "./styles";
import {
  // Calendar,
  // ChartNoAxesColumnIncreasing,
  Target,
  User,
} from "lucide-react-native";
// import { ProfileCardBelt } from "./ProfileBelt";
import { ProfileActivity } from "./ProfileActivity";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@ui/styles/theme";
import { useAuth } from "@app/contexts/AuthContext";
import { BELTS, BeltType } from "@app/hooks/useBelts";

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
            icon={<Target color={theme.colors.white.DEFAULT} />}
            title="Total de Check-ins"
            subtitle={user?.totalCheckins}
          />
          <ProfileCard
            icon={<User color={theme.colors.white.DEFAULT} />}
            title="Faixa atual"
            subtitle={BELTS[user?.belt as BeltType]}
          />
        </View>
        {/* <View style={styles.profileCardContainer}>
          <ProfileCard
            icon={<Calendar color={theme.colors.white.DEFAULT} />}
            title="Check-ins este mês"
            subtitle={user?.checkinsThisMonth}
          />
        </View> */}

        {/* <View style={styles.profileCardContainer}>
          <ProfileCardBelt
            icon={
              <ChartNoAxesColumnIncreasing color={theme.colors.white.DEFAULT} />
            }
            title="Progresso para Azul"
            subtitle={250 - user!.totalCheckins}
          />
        </View> */}

        <View>
          <ProfileActivity />
        </View>
      </View>
    </ScrollView>
  );
}
