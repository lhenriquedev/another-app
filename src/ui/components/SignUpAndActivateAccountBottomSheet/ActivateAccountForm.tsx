import { theme } from "@ui/styles/theme";
import { AppText } from "../AppText";
import { FormGroup } from "../FormGroup";
import { Input } from "../Input";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Alert, View } from "react-native";
import { styles } from "./styles";
import { Button } from "../Button";
import { AuthStep } from ".";

interface IActivateAccountForm {
  onClose: () => void
  onCurrentStep: (step: AuthStep) => void
}

export function ActivateAccountForm({ onClose, onCurrentStep }: IActivateAccountForm) {
  function handleActivateAccount() {
    Alert.alert('Sua conta foi ativada com sucesso.')
    onClose()
    onCurrentStep("register")
  }

  return (
    <View style={styles.form}>
      <AppText color={theme.colors.black[700]} size="3xl" weight="semiBold">
        Ative a sua conta
      </AppText>

      <FormGroup label="Código">
        <Input
          InputComponent={BottomSheetTextInput}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="sms-otp"
          returnKeyType="next"
          onSubmitEditing={handleActivateAccount}
        />
      </FormGroup>

      <Button onPress={handleActivateAccount}>Enviar</Button>
    </View>
  );
}
