import logo from "@ui/assets/logo.jpg";
import welcomeBg from "@ui/assets/welcome-bg/image.jpg";
import { AppText } from "@ui/components/AppText";
import { Button } from "@ui/components/Button";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";
import { SignInBottomSheet } from "@ui/components/SignInBottomSheet";
import { useRef } from "react";
import { ISignInBottomSheet } from "@ui/components/SignInBottomSheet/ISignInBottomSheet";
import { SignUpBottomSheet } from "@ui/components/SignUpBottomSheet";

export function Welcome() {
  const signInBottomSheetRef = useRef<ISignInBottomSheet>(null);
  const signUpBottomSheetRef = useRef<ISignInBottomSheet>(null);

  return (
    <>
      <ImageBackground
        source={welcomeBg}
        resizeMode="cover"
        style={styles.container}
      >
        <SafeAreaView style={styles.content}>
          <Image source={logo} />

          <View style={styles.ctaContainer}>
            <AppText
              color={theme.colors.muted}
              weight="semiBold"
              size="3xl"
              style={styles.heading}
            >
              Sua jornada começa aqui, oss
            </AppText>

            <View style={styles.ctaContent}>
              <Button
                style={{}}
                onPress={() => signUpBottomSheetRef.current?.open()}
              >
                Criar minha conta
              </Button>

              <View style={styles.signInContainer}>
                <AppText color={theme.colors.muted}>Já tem uma conta?</AppText>
                <TouchableOpacity
                  onPress={() => signInBottomSheetRef.current?.open()}
                >
                  <AppText
                    color={theme.colors.muted}
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
      <SignUpBottomSheet ref={signUpBottomSheetRef} />
    </>
  );
}
