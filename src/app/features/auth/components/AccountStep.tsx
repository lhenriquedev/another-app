import { Button } from "@ui/components/Button";
import { FormGroup } from "@ui/components/FormGroup";
import { Input } from "@ui/components/Input";
import {
  RadioGroup,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupLabel,
} from "@ui/components/RadioGroup";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSignup } from "../contexts/useSignup";
import { SignUpFormData } from "../schemas/signupSchema";
import { Step, StepContent, StepFooter, StepHeader } from "./Step";

export function AccountStep() {
  const { nextStep } = useSignup();

  const { control, trigger } = useFormContext<SignUpFormData>();

  const handleNextStep = async () => {
    const isValid = await trigger([
      "email",
      "name",
      "password",
      "gender",
      "confirmPassword",
    ]);

    if (isValid) {
      nextStep();
    }
  };

  return (
    <Step>
      <StepHeader
        title="Crie sua conta"
        subtitle="Adicione seus dados para podermos criar sua conta"
      />

      <StepContent>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <FormGroup label="E-mail" error={fieldState.error?.message}>
              <Input
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
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormGroup
              label="Confirme sua senha"
              error={fieldState.error?.message}
            >
              <Input
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
          name="gender"
          render={({ field, fieldState }) => (
            <FormGroup label="Gênero" error={fieldState.error?.message}>
              <RadioGroup
                orientation="horizontal"
                value={field.value}
                onChangeValue={(value) => {
                  field.onChange(value);
                  trigger("gender");
                }}
                error={!!fieldState.error}
              >
                <RadioGroupItem value="male">
                  <RadioGroupIcon>👨</RadioGroupIcon>
                  <RadioGroupLabel>Masculino</RadioGroupLabel>
                </RadioGroupItem>

                <RadioGroupItem value="female">
                  <RadioGroupIcon>👩</RadioGroupIcon>
                  <RadioGroupLabel>Feminino</RadioGroupLabel>
                </RadioGroupItem>
              </RadioGroup>
            </FormGroup>
          )}
        />
      </StepContent>

      <StepFooter>
        <Button size="icon" variant="primary" onPress={handleNextStep}>
          <ArrowRight size={20} />
        </Button>
      </StepFooter>
    </Step>
  );
}
