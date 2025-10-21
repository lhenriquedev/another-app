import { Image, View } from "react-native";
import { styles } from "../screens/Calendar/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "@ui/components/AppText";
import { useAuth } from "@app/contexts/AuthContext";
import { theme } from "@ui/styles/theme";

export function HomeHeader() {
  const { user } = useAuth();

  return (
    <View style={styles.homeHeader}>
      <SafeAreaView>
        <View style={styles.homeHeaderContent}>
          <View>
            <AppText weight="semiBold" size="2xl">
              Hoje
            </AppText>
            <AppText color={theme.colors.platinum[800]}>
              Bem vindo, {user?.name}
            </AppText>
          </View>

          <Image
            style={styles.homeHeaderImage}
            resizeMode="cover"
            source={{
              uri: "https://imgs.search.brave.com/jC8B4LU0QvDONYhFVsmzM6bnCeg7EVSGV4Y7zqsPGcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/My8xMjU1MjMtMTI0/MngyMjA4LWlwaG9u/ZS1oZC1yaWNrLWFu/ZC1tb3J0eS1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
