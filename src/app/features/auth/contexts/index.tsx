import { createContext } from "react";

interface ISignupContextValue {
  currentStepIndex: number;
  nextStep: () => void;
  previousStep: () => void;
}

export const SignupContext = createContext({} as ISignupContextValue);
