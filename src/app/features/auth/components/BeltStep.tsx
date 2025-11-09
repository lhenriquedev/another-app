import { useAuth } from "@app/contexts/AuthContext";
import { BELTS, useBelts } from "@app/hooks/useBelts";
import { Button } from "@ui/components/Button";
import {
  RadioGroup,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupItemInfo,
  RadioGroupLabel,
} from "@ui/components/RadioGroup";
import { SkeletonBox } from "@ui/components/SkeletonBox";
import { isAxiosError } from "axios";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { toast } from "sonner-native";
import { SignUpFormData } from "../schemas/signupSchema";
import { Step, StepContent, StepFooter, StepHeader } from "./Step";

export function BeltStep() {
  const form = useFormContext<SignUpFormData>();
  const { signUp } = useAuth();
  const { data: belts, isLoading } = useBelts();

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      await signUp({
        beltId: formData.beltId,
        email: formData.email,
        gender: formData.gender,
        name: formData.name,
        password: formData.password,
      });
      toast.success("Sua conta foi criada com sucesso!");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  });

  return (
    <Step>
      <StepHeader
        title="Escolha sua faixa"
        subtitle="Selecione a faixa que você está treinando atualmente"
      />

      <StepContent>
        {isLoading ? (
          <BeltsSkeleton />
        ) : (
          <Controller
            control={form.control}
            name="beltId"
            render={({ field, fieldState }) => (
              <RadioGroup
                value={field.value}
                onChangeValue={field.onChange}
                error={!!fieldState.error}
              >
                {belts?.map((belt) => (
                  <RadioGroupItem key={belt.id} value={belt.id}>
                    <RadioGroupIcon>🥋</RadioGroupIcon>
                    <RadioGroupItemInfo>
                      <RadioGroupLabel>{BELTS[belt.belt]}</RadioGroupLabel>
                    </RadioGroupItemInfo>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            )}
          />
        )}
      </StepContent>

      <StepFooter align="start">
        <Button
          variant="primary"
          style={{ width: "100%" }}
          onPress={handleSubmit}
          loading={form.formState.isSubmitting}
        >
          Criar conta
        </Button>
      </StepFooter>
    </Step>
  );
}

function BeltsSkeleton() {
  return (
    <View style={{ gap: 12 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonBox key={index} height={64} borderRadius={8} />
      ))}
    </View>
  );
}
