import { FormGroup } from "@ui/components/FormGroup";
import { Input } from "@ui/components/Input";
import { styles } from "./styles";
import { ScrollView, View } from "react-native";
import { Button } from "@ui/components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@app/contexts/AuthContext";

export function ProfileInfo() {
  const { user } = useAuth();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: bottom,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={[styles.profileFormContent]}>
        <View style={{ flex: 1, gap: 32 }}>
          <FormGroup label="E-mail">
            <Input disabled value={user?.email} />
          </FormGroup>
          <FormGroup label="Nome">
            <Input value={user?.name} />
          </FormGroup>
          <FormGroup label="Telefone">
            <Input mask="(51) 9999-9999" value={user?.phone} />
          </FormGroup>
          <FormGroup label="Data de Nascimento">
            <Input mask="99/99/9999" value={user?.birthDate} />
          </FormGroup>
        </View>

        <Button>Salvar</Button>
      </View>
    </ScrollView>
  );
}
