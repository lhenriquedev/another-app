import { useAuth } from "@app/contexts/AuthContext";
import { useProfileUpdate } from "@app/hooks/useProfileUpdate";
import { ProfileStackParamList } from "@app/navigation/ProfileStack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@ui/components/Button";
import { Screen } from "@ui/components/Screen";
import { isAxiosError } from "axios";
import { format } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { toast } from "sonner-native";
import { z } from "zod";
import { ProfileInfo } from "../Profile/ProfileInfo";
import { styles } from "./styles";

const schema = z.object({
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  birthDate: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  gender: z.enum(["male", "female"]),
  phone: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof schema>;

type EditProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "EditProfile"
>;

export function EditProfile() {
  const { user } = useAuth();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useProfileUpdate();
  const navigation = useNavigation<EditProfileNavigationProp>();

  const formatBirthDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy");
    } catch {
      return "";
    }
  };

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      birthDate: formatBirthDate(user?.birthDate),
      phone: user?.phone || "",
      gender: user?.gender || "male",
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      const parseBirthDate = (dateStr: string | undefined) => {
        if (!dateStr) return undefined;
        const [day, month, year] = dateStr.split("/");
        if (!day || !month || !year) return undefined;
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      };

      await updateProfile({
        name: formData.name,
        email: formData.email || undefined,
        birthDate: parseBirthDate(formData.birthDate),
        phone: formData.phone,
        gender: formData.gender,
      });

      toast.success("Perfil atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Erro ao atualizar perfil"
        );
      } else {
        toast.error("Erro ao atualizar perfil");
      }
    }
  });

  return (
    <Screen headerType="default" style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={styles.container}>
          <ProfileInfo />
          <Button
            variant="primary"
            onPress={handleSubmit}
            disabled={isUpdating}
            loading={isUpdating}
          >
            Salvar
          </Button>
        </View>
      </FormProvider>
    </Screen>
  );
}
