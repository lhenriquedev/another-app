import { useAuth } from "@app/contexts/AuthContext";
import { BELTS, BeltType } from "@app/hooks/useBelts";
import { Screen } from "@ui/components/Screen";
import { theme } from "@ui/styles/theme";
import { Target, User } from "lucide-react-native";
import { View } from "react-native";
import { ProfileActivity } from "../Profile/ProfileActivity";
import { ProfileCard } from "../Profile/ProfileCard";
import { styles } from "./styles";

export function Home() {
  const { user } = useAuth();

  return (
    <Screen hasScroll headerType="home">
      <View style={styles.homeContainer}>
        <View style={styles.homeCardContainer}>
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
        <View>
          <ProfileActivity />
        </View>
      </View>
    </Screen>
  );
}
