import { View } from "react-native";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";
import { AppText } from "@ui/components/AppText";
import { ProfileActivityCard } from "./ProfileActivityCard";
import { useRecentClasses } from "@app/hooks/useRecentClasses";
import { FlashList } from "@shopify/flash-list";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EmptyState } from "@ui/components/EmptyState";
import { Target } from "lucide-react-native";
import { ProfileActivityListSkeleton } from "./ProfileActivitySkeleton";

export function ProfileActivity() {
  const { data, isLoading } = useRecentClasses();

  return (
    <View style={styles.profileCardContent}>
      <View style={styles.profileCardActivityHeader}>
        <View
          style={{
            width: 4,
            height: 24,
            backgroundColor: theme.colors.primary,
          }}
        />

        <AppText weight="semiBold">Atividade Recente</AppText>
      </View>

      <View style={styles.profileCardActivityContainer}>
        {isLoading ? (
          <ProfileActivityListSkeleton count={3} />
        ) : (
          <FlashList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            ListEmptyComponent={
              <EmptyState
                title="Você não fez nenhuma aula"
                description={
                  "Faça check-in em uma aula para começar a registrar"
                }
                icon={<Target />}
              />
            }
            renderItem={({ item }) => (
              <ProfileActivityCard
                title={item.categoryType}
                day={formatDistanceToNow(item.date, {
                  addSuffix: true,
                  locale: ptBR,
                })}
                hour={format(parseISO(item.startTime), "Pp", { locale: ptBR })}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}
