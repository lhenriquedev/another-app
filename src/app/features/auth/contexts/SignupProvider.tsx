import { signupNavigation } from "@app/features/auth/screens/Signup/SignupStack";
import { AuthStackNavigationsProps } from "@app/navigation/AuthStack";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { SignupContext } from ".";
import { orderedSignupSteps } from "../utils/steps";

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { goBack } = useNavigation<AuthStackNavigationsProps>();

  const nextStep = useCallback(() => {
    const nextStepIndex = currentStepIndex + 1;
    const nextStep = orderedSignupSteps[nextStepIndex];

    if (!nextStep) return;

    signupNavigation?.navigate(nextStep);
    setCurrentStepIndex(nextStepIndex);
  }, [currentStepIndex]);

  const previousStep = useCallback(() => {
    const previousStepIndex = currentStepIndex - 1;

    if (!signupNavigation.canGoBack()) {
      goBack();
      return;
    }

    signupNavigation?.goBack();
    setCurrentStepIndex(previousStepIndex);
  }, [currentStepIndex]);

  return (
    <SignupContext.Provider
      value={{
        currentStepIndex,
        nextStep,
        previousStep,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}
