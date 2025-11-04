import { useAuth } from "@app/contexts/AuthContext";
import { AppStackNavigationsProps } from "@app/navigation/AppStack";
import { useNavigation } from "@react-navigation/native";
import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { Image, View } from "react-native";
import { styles } from "../screens/Calendar/styles";
import { Button } from "./Button";

export function HomeHeader() {
  const { user } = useAuth();

  const navigation = useNavigation<AppStackNavigationsProps>();
  return (
    <View style={styles.container}>
      <View>
        <AppText weight="semiBold" size="xl">
          Hoje
        </AppText>
        <AppText color={theme.colors.mutedText}>
          Bem vindo, {user?.name}
        </AppText>
      </View>

      <Button
        size="icon"
        variant="ghost"
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          style={styles.homeHeaderImage}
          resizeMode="cover"
          source={{ uri: user?.avatar }}
        />
      </Button>
    </View>
  );
}
