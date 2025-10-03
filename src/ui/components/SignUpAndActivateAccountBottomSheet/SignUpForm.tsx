import { TextInput, View } from "react-native";
import { FormGroup } from "../FormGroup";
import { Input } from "../Input";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { AppText } from "../AppText";
import { theme } from "@ui/styles/theme";
import { styles } from "./styles";
import { Button } from "../Button";
import { AuthStep } from ".";

interface ISignUpFormProps {
  onCurrentStep: (step: AuthStep) => void
}

export function SignUpForm({ onCurrentStep }: ISignUpFormProps) {
  const passwordInputRef = useRef<TextInput>(null);

  function handleRegister() {
    onCurrentStep("activate-account")
  }

  return (
    <View style={styles.form}>
      <AppText color={theme.colors.black[700]} size="3xl" weight="semiBold">
        Crie a conta
      </AppText>

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
        />
      </FormGroup>

      <Button onPress={handleRegister}>Criar conta</Button>
    </View>
  );
}
