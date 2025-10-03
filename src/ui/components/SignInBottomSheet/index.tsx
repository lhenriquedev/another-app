import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { AppText } from "../AppText";
import React, { useImperativeHandle, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ISignInBottomSheet } from "./ISignInBottomSheet";
import { Input } from "../Input";
import { theme } from "@ui/styles/theme";
import { FormGroup } from "../FormGroup";
import { Alert, TextInput, View } from "react-native";
import { styles } from "./styles";
import { Button } from "../Button";

interface ISignInBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    []
  );

  function handleSubmit() {
    Alert.alert("Enviando...");
  }

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
          <AppText color={theme.colors.black[700]} size="3xl" weight="semiBold">
            Acesse a sua conta
          </AppText>

          <View style={styles.form}>
            <FormGroup label="E-mail">
              <Input
                InputComponent={BottomSheetTextInput}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
            </FormGroup>

            <FormGroup label="Senha">
              <Input
                ref={passwordInputRef}
                InputComponent={BottomSheetTextInput}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
            </FormGroup>

            <Button onPress={handleSubmit}>Entrar</Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
