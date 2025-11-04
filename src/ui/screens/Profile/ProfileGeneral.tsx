import { Platform, ScrollView, View } from "react-native";
import { styles } from "./styles";
// import { ProfileCardBelt } from "./ProfileBelt";
import { useAuth } from "@app/contexts/AuthContext";
import { BELTS, BeltType } from "@app/hooks/useBelts";
import { Card, CardContainer, CardHeader, CardIcon } from "@ui/components/Card";
import { theme } from "@ui/styles/theme";
import { LifeBuoy } from "lucide-react-native";
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
        <CardContainer style={{ paddingHorizontal: 0 }}>
          <Card>
            <CardHeader
              label="Faixa atual"
              title={BELTS[user?.belt as BeltType]}
            />
            <CardIcon Icon={LifeBuoy} color={theme.colors.primary} size={24} />
          </Card>
        </CardContainer>
        {/* <View style={styles.profileCardContainer}>
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
        </View> */}
        <View>
          <ProfileActivity />
        </View>
      </View>
    </ScrollView>
  );
}
