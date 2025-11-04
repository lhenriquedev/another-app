import { FormGroup } from "@ui/components/FormGroup";
import { Input } from "@ui/components/Input";
import { OptionsSelector } from "@ui/components/OptionsSelector";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { ProfileFormData } from "../EditProfile";
import { styles } from "./styles";

export function ProfileInfo() {
  const { control } = useFormContext<ProfileFormData>();

  return (
    <View style={[styles.profileFormContent]}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <FormGroup label="Nome" error={fieldState.error?.message}>
            <Input value={field.value} onChangeText={field.onChange} />
          </FormGroup>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <FormGroup label="E-mail" error={fieldState.error?.message}>
            <Input value={field.value} onChangeText={field.onChange} />
          </FormGroup>
        )}
      />
      <Controller
        name="birthDate"
        control={control}
        render={({ field, fieldState }) => (
          <FormGroup
            label="Data de nascimento"
            error={fieldState.error?.message}
          >
            <Input
              mask="99/99/9999"
              value={field.value}
              onChangeText={field.onChange}
            />
          </FormGroup>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <FormGroup label="Telefone" error={fieldState.error?.message}>
            <Input
              mask="(99) 9999-99999"
              value={field.value}
              onChangeText={field.onChange}
            />
          </FormGroup>
        )}
      />

      <Controller
        name="gender"
        control={control}
        render={({ field, fieldState }) => (
          <FormGroup label="Gênero" error={fieldState.error?.message}>
            <OptionsSelector
              isRow
              fullWidth
              options={[
                { icon: "👨", title: "Masculino", value: "male" },
                { icon: "👩", title: "Feminino", value: "female" },
              ]}
              value={field.value}
              onChange={field.onChange}
            />
          </FormGroup>
        )}
      />
    </View>
  );
}
