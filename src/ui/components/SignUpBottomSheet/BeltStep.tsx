import { View } from "react-native";
import { OptionsSelector } from "../OptionsSelector";
import { styles } from "./styles";
import { AppText } from "../AppText";
import { theme } from "@ui/styles/theme";
import { BELTS, useBelts } from "@app/hooks/useBelts";
import { OptionsSelectorSkeleton } from "../OptionsSelector/OptionsSelectorSkeleton";
import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormData } from "./schema";
import { FormGroup } from "../FormGroup";
import { EmptyState } from "../EmptyState";
import { Target } from "lucide-react-native";

export function BeltStep() {
  const { control } = useFormContext<SignUpFormData>();
  const { data: belts, isLoading } = useBelts();

  const options = belts?.map((belt) => ({
    value: belt.id,
    title: BELTS[belt.belt],
    icon: "🥋",
  }));

  return (
    <View style={styles.form}>
      <AppText color={theme.colors.black[700]} size="3xl" weight="semiBold">
        Escolha a sua faixa
      </AppText>

      {isLoading && <OptionsSelectorSkeleton fullWidth optionsCount={3} />}
      {!isLoading && (
        <Controller
          control={control}
          name="beltId"
          render={({ field, fieldState }) => (
            <FormGroup label="Faixa" error={fieldState.error?.message}>
              <OptionsSelector
                options={options ?? []}
                value={field.value}
                onChange={field.onChange}
              />
            </FormGroup>
          )}
        />
      )}

      {belts?.length === 0 && (
        <EmptyState title="Nenhuma faixa cadastrada" icon={<Target />} />
      )}
    </View>
  );
}
