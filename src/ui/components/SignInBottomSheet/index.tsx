import React, { useImperativeHandle, useRef } from "react";
import { TextInput, View } from "react-native";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { FormGroup } from "../FormGroup";
import { Input } from "../Input";
import { ISignInBottomSheet } from "./ISignInBottomSheet";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@app/contexts/AuthContext";
import { isAxiosError } from "axios";
import { toast } from "sonner-native";

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
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
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
          <AppText color={theme.colors.black[700]} size="3xl" weight="semiBold">
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
