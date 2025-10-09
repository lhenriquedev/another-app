import { Image, View } from "react-native";
import { styles } from "./styles";
import { AppText } from "@ui/components/AppText";
import { useAuth } from "@app/contexts/AuthContext";
import { theme } from "@ui/styles/theme";

export function ProfileAvatar() {
  const { user } = useAuth();

  console.log(user);

  return (
    <View style={styles.profileAvatarContainer}>
      <Image
        style={styles.profileAvatar}
        resizeMode="cover"
        source={{
          uri: "https://imgs.search.brave.com/jC8B4LU0QvDONYhFVsmzM6bnCeg7EVSGV4Y7zqsPGcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/My8xMjU1MjMtMTI0/MngyMjA4LWlwaG9u/ZS1oZC1yaWNrLWFu/ZC1tb3J0eS1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
        }}
      />

      <AppText color={theme.colors.black.DEFAULT} weight="semiBold">
        {user?.name}
      </AppText>
    </View>
  );
}
