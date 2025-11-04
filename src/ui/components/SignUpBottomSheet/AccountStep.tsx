import { AppText } from "../AppText";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { FormGroup } from "../FormGroup";
import { Input } from "../Input";
import { styles } from "./styles";
import { View } from "react-native";
import { theme } from "@ui/styles/theme";
import { OptionsSelector } from "../OptionsSelector";
import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormData } from "./schema";

export function AccountStep() {
  const { control } = useFormContext<SignUpFormData>();

  return (
    <View style={styles.form}>
      <AppText color={theme.colors.text} size="3xl" weight="semiBold">
        Crie a conta
      </AppText>

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <FormGroup label="E-mail" error={fieldState.error?.message}>
            <Input
              InputComponent={BottomSheetTextInput}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              onChangeText={field.onChange}
              value={field.value}
            />
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <FormGroup label="Nome" error={fieldState.error?.message}>
            <Input
              InputComponent={BottomSheetTextInput}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={field.onChange}
              value={field.value}
            />
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <FormGroup label="Senha" error={fieldState.error?.message}>
            <Input
              InputComponent={BottomSheetTextInput}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              returnKeyType="next"
              onChangeText={field.onChange}
              value={field.value}
            />
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name="birthDate"
        render={({ field, fieldState }) => (
          <FormGroup
            label="Data de nascimento"
            error={fieldState.error?.message}
          >
            <Input
              InputComponent={BottomSheetTextInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="DD/MM/AAAA"
              returnKeyType="next"
              mask="99/99/9999"
              onChangeText={field.onChange}
              value={field.value}
            />
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <FormGroup label="Telefone" error={fieldState.error?.message}>
            <Input
              InputComponent={BottomSheetTextInput}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="tel"
              placeholder="(11) 99999-9999"
              returnKeyType="next"
              mask="(99) 99999-9999"
              onChangeText={field.onChange}
              value={field.value}
            />
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name="gender"
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
