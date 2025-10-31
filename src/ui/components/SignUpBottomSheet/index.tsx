import { AccountStep } from "./AccountStep";
import { View } from "react-native";
import { BeltStep } from "./BeltStep";
import { Button } from "../Button";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { ISignInBottomSheet } from "../SignInBottomSheet/ISignInBottomSheet";
import { signUpSchema } from "./signUpSchema";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";
import { useAuth } from "@app/contexts/AuthContext";
import { useImperativeHandle, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { toast } from "sonner-native";

interface ISignUpAndActivateAccountBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function SignUpBottomSheet({
  ref,
}: ISignUpAndActivateAccountBottomSheetProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const { signUp } = useAuth();

  const steps = [
    {
      Component: AccountStep,
      fields: [
        "name",
        "email",
        "password",
        "confirmPassword",
        "phone",
        "birthDate",
        "gender",
      ] as const,
    },
    { Component: BeltStep, fields: ["beltId"] as const },
  ];
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
      close: () => bottomSheetModalRef.current?.dismiss(),
    }),
    []
  );

  function handlePreviousStep() {
    if (currentStepIndex === 0) {
      bottomSheetModalRef.current?.dismiss();
      return;
    }

    setCurrentStepIndex((prevStep) => prevStep - 1);
  }

  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  async function handleNextStep() {
    const isValid = await form.trigger(currentStep.fields as any);
    if (!isValid) return;

    setCurrentStepIndex((prevStep) => prevStep + 1);
  }

  const handleSubmit = form.handleSubmit(async (formData) => {
    const [day, month, year] = formData.birthDate.split("/");

    try {
      await signUp({
        beltId: formData.beltId,
        birthDate: `${year}/${month}/${day}`,
        email: formData.email,
        gender: formData.gender,
        name: formData.name,
        password: formData.password,
        phone: formData.phone || "",
      });
      toast.success("Sua conta foi criada com sucesso!");
      bottomSheetModalRef.current?.dismiss();
      setCurrentStepIndex(0);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  });

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onDismiss={() => form.reset()}
        backgroundStyle={{ backgroundColor: theme.colors.card }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.mutedText }}
      >
        <BottomSheetScrollView style={[styles.container]}>
          <FormProvider {...form}>
            <currentStep.Component />
          </FormProvider>

          <View style={[styles.buttonContainer, { paddingBottom: bottom }]}>
            <Button
              variant="secondary"
              size="icon"
              onPress={handlePreviousStep}
            >
              <ChevronLeft color={theme.colors.text} />
            </Button>

            {isLastStep ? (
              <Button
                onPress={handleSubmit}
                loading={form.formState.isSubmitting}
              >
                Cria conta
              </Button>
            ) : (
              <Button variant="secondary" size="icon" onPress={handleNextStep}>
                <ChevronRight color={theme.colors.text} />
              </Button>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
