import { AccountStep } from "./AccountStep";
import { Alert, View } from "react-native";
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
  BottomSheetView,
} from "@gorhom/bottom-sheet";

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

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
      close: () => bottomSheetModalRef.current?.close(),
    }),
    []
  );

  function handlePreviousStep() {
    if (currentStepIndex === 0) {
      bottomSheetModalRef.current?.close();
      return;
    }

    setCurrentStepIndex((prevStep) => prevStep - 1);
  }

  function handleNextStep() {
    setCurrentStepIndex((prevStep) => prevStep + 1);
  }

  const steps = [{ Component: AccountStep }, { Component: BeltStep }];
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

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
      bottomSheetModalRef.current?.close();
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
    }
  });

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
          <FormProvider {...form}>
            <currentStep.Component />
          </FormProvider>

          <View style={styles.buttonContainer}>
            <Button
              variant="secondary"
              size="icon"
              onPress={handlePreviousStep}
            >
              <ChevronLeft color={theme.colors.black[500]} />
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
                <ChevronRight color={theme.colors.black[500]} />
              </Button>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
