import { Image, View } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";

export function HomeHeader() {
  return (
    <View style={[styles.homeHeader]}>
      <SafeAreaView>
        <View style={styles.homeHeaderContent}>
          <Image
            style={styles.homeHeaderImage}
            resizeMode="cover"
            source={{
              uri: "https://imgs.search.brave.com/jC8B4LU0QvDONYhFVsmzM6bnCeg7EVSGV4Y7zqsPGcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/My8xMjU1MjMtMTI0/MngyMjA4LWlwaG9u/ZS1oZC1yaWNrLWFu/ZC1tb3J0eS1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
            }}
          />
          <View>
            <AppText color={theme.colors.white.DEFAULT}>Olá, 🖖</AppText>
            <AppText color={theme.colors.white.DEFAULT} weight="semiBold">Henrique</AppText>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
