import { useAuth } from "@app/contexts/AuthContext";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { theme } from "@ui/styles/theme";
import { isAxiosError } from "axios";
import React, { useImperativeHandle, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { z } from "zod";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { FormGroup } from "../FormGroup";
import { Input } from "../Input";
import { ISignInBottomSheet } from "./ISignInBottomSheet";
import { styles } from "./styles";

const signInSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

interface ISignInBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
  const { signIn } = useAuth();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    []
  );

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "teste@teste.com",
      password: "Teste@123",
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      await signIn(formData);
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
        backgroundStyle={{ backgroundColor: theme.colors.card }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.mutedText }}
      >
        <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
          <AppText color={theme.colors.text} size="3xl" weight="semiBold">
            Acesse a sua conta
          </AppText>

          <View style={styles.form}>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormGroup label="E-mail" error={fieldState.error?.message}>
                  <Input
                    InputComponent={BottomSheetTextInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    returnKeyType="next"
                    value={field.value}
                    onChangeText={field.onChange}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormGroup label="Senha" error={fieldState.error?.message}>
                  <Input
                    ref={passwordInputRef}
                    InputComponent={BottomSheetTextInput}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="current-password"
                    returnKeyType="done"
                    value={field.value}
                    onChangeText={field.onChange}
                    onSubmitEditing={handleSubmit}
                  />
                </FormGroup>
              )}
            />

            <Button
              variant="primary"
              onPress={handleSubmit}
              disabled={form.formState.isSubmitting}
              loading={form.formState.isSubmitting}
            >
              Entrar
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
