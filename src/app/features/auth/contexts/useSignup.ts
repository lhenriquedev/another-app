import { use } from "react";
import { SignupContext } from ".";

export function useSignup() {
  const value = use(SignupContext);

  if (!value) {
    throw new Error("useSignup must be used within a SignupProvider");
  }

  return value;
}
