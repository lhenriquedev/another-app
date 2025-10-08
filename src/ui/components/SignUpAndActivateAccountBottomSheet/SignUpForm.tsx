import { AppText } from "../AppText";
import { AuthStep } from ".";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Button } from "../Button";
import { FormGroup } from "../FormGroup";
import { Input } from "../Input";
import { OptionsSelector } from "../OptionsSelector";
import { styles } from "./styles";
import { TextInput, View } from "react-native";
import { theme } from "@ui/styles/theme";
import { useRef } from "react";

interface ISignUpFormProps {
  onCurrentStep: (step: AuthStep) => void;
}

export function SignUpForm({ onCurrentStep }: ISignUpFormProps) {
  const passwordInputRef = useRef<TextInput>(null);

  function handleRegister() {
    onCurrentStep("activate-account");
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

      <FormGroup label="Faixa">
        <OptionsSelector
          options={[
            { icon: "🥋", title: "Branca", value: "1" },
            { icon: "🥋", title: "Azul", value: "2" },
            { icon: "🥋", title: "Roxa", value: "3" },
            { icon: "🥋", title: "Marrom", value: "4" },
            { icon: "🥋", title: "Preta", value: "5" },
          ]}
          value="1"
        />
      </FormGroup>

      <Button onPress={handleRegister}>Criar conta</Button>
    </View>
  );
}
