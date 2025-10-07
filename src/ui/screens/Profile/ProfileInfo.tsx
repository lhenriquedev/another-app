import { FormGroup } from "@ui/components/FormGroup";
import { Input } from "@ui/components/Input";
import { styles } from "./styles";
import { View } from "react-native";
import { Button } from "@ui/components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ProfileInfo() {
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={[styles.profileFormContent, { marginBottom: bottom }]}>
      <View style={{ flex: 1, gap: 32 }}>
        <FormGroup label="E-mail">
          <Input />
        </FormGroup>
        <FormGroup label="Nome">
          <Input />
        </FormGroup>
        <FormGroup label="Senha">
          <Input secureTextEntry />
        </FormGroup>
      </View>

      <Button>Salvar</Button>
    </View>
  )
}
