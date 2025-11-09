import { AuthStackNavigationsProps } from "@app/navigation/AuthStack";
import { useNavigation } from "@react-navigation/native";
import welcomeBg from "@ui/assets/welcome-bg/image.jpg";
import { AppText } from "@ui/components/AppText";
import { Button } from "@ui/components/Button";
import { SignInBottomSheet } from "@ui/components/SignInBottomSheet";
import { ISignInBottomSheet } from "@ui/components/SignInBottomSheet/ISignInBottomSheet";
import { theme } from "@ui/styles/theme";
import { useRef } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export function Welcome() {
  const navigation = useNavigation<AuthStackNavigationsProps>();
  const signInBottomSheetRef = useRef<ISignInBottomSheet>(null);

  return (
    <>
      <ImageBackground
        source={welcomeBg}
        resizeMode="cover"
        style={styles.container}
      >
        <SafeAreaView style={styles.content}>
          <View style={styles.ctaContainer}>
            <AppText
              color={theme.colors.text}
              weight="semiBold"
              size="3xl"
              style={styles.heading}
            >
              Sua jornada começa aqui, oss
            </AppText>

            <View style={styles.ctaContent}>
              <Button
                variant="primary"
                onPress={() => navigation.navigate("Signup")}
              >
                Criar minha conta
              </Button>

              <View style={styles.signInContainer}>
                <AppText color={theme.colors.text}>Já tem uma conta?</AppText>
                <TouchableOpacity
                  onPress={() => signInBottomSheetRef.current?.open()}
                >
                  <AppText
                    color={theme.colors.text}
                    style={{ textDecorationLine: "underline" }}
                  >
                    Acesse a sua conta
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <SignInBottomSheet ref={signInBottomSheetRef} />
    </>
  );
}
