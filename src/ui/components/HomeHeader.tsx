import { useAuth } from "@app/contexts/AuthContext";
import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { Image, View } from "react-native";
import { styles } from "../screens/Calendar/styles";
import { Button } from "./Button";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigationsProps } from "@app/navigation/AppStack";

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
          source={{
            uri: "https://imgs.search.brave.com/jC8B4LU0QvDONYhFVsmzM6bnCeg7EVSGV4Y7zqsPGcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/My8xMjU1MjMtMTI0/MngyMjA4LWlwaG9u/ZS1oZC1yaWNrLWFu/ZC1tb3J0eS1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
          }}
        />
      </Button>
    </View>
  );
}
