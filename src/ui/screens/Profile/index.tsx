import { useAuth } from "@app/contexts/AuthContext";
import { useProfileUpdate } from "@app/hooks/useProfileUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/components/Button";
import { Screen } from "@ui/components/Screen";
import { isAxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { toast } from "sonner-native";
import z from "zod";
import { ProfileInfo } from "./ProfileInfo";
import { styles } from "./styles";

export type SelectedTab = "general" | "info";

const schema = z.object({
  email: z.email().optional(),
  birthDate: z.string().optional(),
  name: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  phone: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof schema>;

export function Profile() {
  const { user } = useAuth();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useProfileUpdate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email ?? "",
      birthDate: user?.birthDate ?? "",
      gender: user?.gender,
      name: user?.name ?? "",
      phone: user?.phone ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data: ProfileFormData) => {
    const [day = "", month = "", year = ""] = data.birthDate?.split("/") ?? [];

    try {
      await updateProfile({
        name: data.name,
        gender: data.gender,
        birthDate: `${year}/${month}/${day}`,
        email: data.email,
        phone: data.phone,
      });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  });

  return (
    <Screen hasScroll headerType="default">
      <View style={styles.profileContent}>
        <FormProvider {...form}>
          {/* <ProfileAvatar /> */}
          <ProfileInfo />
          <Button
            disabled={isUpdating}
            loading={isUpdating}
            onPress={handleSubmit}
          >
            Salvar
          </Button>
        </FormProvider>
      </View>
    </Screen>
  );
}
