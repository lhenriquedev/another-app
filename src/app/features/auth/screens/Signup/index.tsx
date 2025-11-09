import { SignupProvider } from "@app/features/auth/contexts/SignupProvider";
import { SignupStack } from "@app/features/auth/screens/Signup/SignupStack";
import { zodResolver } from "@hookform/resolvers/zod";
import { theme } from "@ui/styles/theme";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SignupHeader } from "../../components/SignupHeader";
import { signUpSchema } from "../../schemas/signupSchema";

export function Signup() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <FormProvider {...form}>
      <SignupProvider>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <SignupHeader />
          <SignupStack />
        </KeyboardAvoidingView>
      </SignupProvider>
    </FormProvider>
  );
}
