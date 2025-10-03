import { ActivateAccountForm } from "./ActivateAccountForm";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ISignInBottomSheet } from "../SignInBottomSheet/ISignInBottomSheet";
import { SignUpForm } from "./SignUpForm";
import { styles } from "./styles";
import { useImperativeHandle, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ISignUpAndActivateAccountBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export type AuthStep = "register" | "activate-account";

export function SignUpAndActivateAccountBottomSheet({
  ref,
}: ISignUpAndActivateAccountBottomSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState<AuthStep>("register");

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
      close: () => bottomSheetModalRef.current?.close(),
    }),
    []
  );

  function handleCurrentStep(step: AuthStep) {
    setCurrentStep(step);
  }

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
          {currentStep === "register" && (
            <SignUpForm onCurrentStep={handleCurrentStep} />
          )}
          {currentStep === "activate-account" && (
            <ActivateAccountForm
              onCurrentStep={handleCurrentStep}
              onClose={() => bottomSheetModalRef.current?.dismiss()}
            />
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
