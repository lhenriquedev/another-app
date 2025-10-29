import { useRanking } from "@app/hooks/useRanking";
import { FlashList } from "@shopify/flash-list";
import { Screen } from "@ui/components/Screen";
import { View } from "react-native";
import { RankingItem } from "./RankingItem";
import { RankingPodiumItem } from "./RankingPodiumItem";
import { styles } from "./styles";
import { EmptyState } from "@ui/components/EmptyState";
import { RankingSkeleton } from "./RankingSkeleton";
import { ChartNoAxesColumn } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Ranking() {
  const { data: ranking, isPending, error } = useRanking();

  const { bottom } = useSafeAreaInsets();

  const renderContent = () => {
    if (error) {
      return <EmptyState title="Erro ao carregar o ranking" />;
    }

    if (isPending) {
      return <RankingSkeleton />;
    }

    if (!ranking || ranking?.length === 0) {
      return <EmptyState title="Nenhum aluno no ranking" />;
    }
    if (ranking?.length < 3)
      return (
        <EmptyState
          icon={<ChartNoAxesColumn />}
          title="Ranking insuficiente para exibir o pódio"
        />
      );

    return (
      <>
        <View style={styles.rankingPodiumContainer}>
          <RankingPodiumItem
            position={secondPlace?.position ?? 2}
            name={secondPlace?.userName ?? "-"}
            totalCheckins={secondPlace?.totalCheckins ?? 0}
          />
          <RankingPodiumItem
            position={firstPlace?.position ?? 1}
            name={firstPlace?.userName ?? "-"}
            totalCheckins={firstPlace?.totalCheckins ?? 0}
          />
          <RankingPodiumItem
            position={thirdPlace?.position ?? 3}
            name={thirdPlace?.userName ?? "-"}
            totalCheckins={thirdPlace?.totalCheckins ?? 0}
          />
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <FlashList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: bottom }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            data={rest}
            renderItem={({ item }) => <RankingItem {...item} />}
          />
        </View>
      </>
    );
  };

  const [firstPlace, secondPlace, thirdPlace, ...rest] = ranking ?? [];

  return (
    <Screen style={{ flex: 1 }} headerType="default">
      {renderContent()}
    </Screen>
  );
}
