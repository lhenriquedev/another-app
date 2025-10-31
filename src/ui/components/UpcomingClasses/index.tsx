import { IUpcomingClasses } from "@app/hooks/useUpcomingClasses";
import { EmptyState } from "../EmptyState";
import { Calendar, ClockAlert } from "lucide-react-native";
import { SkeletonBox } from "../SkeletonBox";
import { View } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";
import { FlashList } from "@shopify/flash-list";
import { UpcomingClassesCard } from "../UpcomingClassCard";
import { theme } from "@ui/styles/theme";

interface IUpcomingClassesProps {
  upcomingClasses: IUpcomingClasses[];
  isLoadingUpcomingClasses: boolean;
  error: any;
  onClassPress: (classId: string) => void;
}

export function UpcomingClasses({
  upcomingClasses,
  error,
  isLoadingUpcomingClasses,
  onClassPress,
}: IUpcomingClassesProps) {
  if (upcomingClasses?.length === 0) {
    return (
      <EmptyState
        icon={<ClockAlert size={48} color={theme.colors.text} />}
        title="Você não fez nenhum check-in"
        description="Faça um check-in em uma aula para visualizar as suas próximas aulas"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<ClockAlert size={48} color={theme.colors.text} />}
        title="Erro ao buscar suas proximas aulas"
      />
    );
  }

  if (isLoadingUpcomingClasses) {
    return <SkeletonBox height={30} />;
  }

  return (
    <>
      <View style={styles.header}>
        <Calendar color={theme.colors.primary} />
        <AppText weight="semiBold">Próximas aulas</AppText>
      </View>

      <FlashList
        horizontal
        data={upcomingClasses}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <UpcomingClassesCard
            {...item}
            onClassPress={onClassPress}
            totalItems={upcomingClasses.length}
          />
        )}
      />
    </>
  );
}
