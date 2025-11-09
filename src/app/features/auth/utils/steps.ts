import { SignupStackParamList } from "@app/features/auth/screens/Signup/SignupStack";

export const orderedSignupSteps: (keyof SignupStackParamList)[] = [
  "Account",
  "Belt",
];

export const TOTAL_STEPS = orderedSignupSteps.length;
