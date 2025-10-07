import { Platform, ScrollView, View } from "react-native";
import { ProfileCard } from "./ProfileCard";
import { styles } from "./styles";
import {
  Calendar,
  ChartNoAxesColumnIncreasing,
  Target,
  User,
} from "lucide-react-native";
import { ProfileCardBelt } from "./ProfileBelt";
import { ProfileActivity } from "./ProfileActivity";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ProfileGeneral() {
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
            icon={<Target />}
            title="Total de Check-ins"
            subtitle={245}
          />
          <ProfileCard icon={<User />} title="Faixa atual" subtitle="Branca" />
        </View>
        <View style={styles.profileCardContainer}>
          <ProfileCard
            icon={<Calendar />}
            title="Check-ins este mês"
            subtitle={12}
          />
        </View>

        <View style={styles.profileCardContainer}>
          <ProfileCardBelt
            icon={<ChartNoAxesColumnIncreasing />}
            title="Progresso para Azul"
            subtitle="Faltam 65 aulas para a próxima faixa"
          />
        </View>

        <View>
          <ProfileActivity />
        </View>
      </View>
    </ScrollView>
  );
}
