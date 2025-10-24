// Ranking.tsx (atualizado)
import { useRanking } from "@app/hooks/useRanking";
import { FlashList } from "@shopify/flash-list";
import { Screen } from "@ui/components/Screen";
import { View } from "react-native";
import { RankingItem } from "./RankingItem";
import { RankingItemSkeleton } from "./RankingItemSkeleton";
import { RankingPodiumItem } from "./RankingPodiumItem";
import { RankingPodiumItemSkeleton } from "./RankingPodiumItemSkeleton";
import { styles } from "./styles";

export function Ranking() {
  const { data: ranking, isPending } = useRanking();

  const [firstPlace, secondPlace, thirdPlace, ...rest] = ranking ?? [];

  if (isPending) {
    return (
      <Screen hasScroll headerType="default">
        <View style={styles.rankingPodiumContainer}>
          <RankingPodiumItemSkeleton />
          <RankingPodiumItemSkeleton isFirstPosition />
          <RankingPodiumItemSkeleton />
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <View style={{ height: 8 }} />
          <RankingItemSkeleton />
          <View style={{ height: 8 }} />
          <RankingItemSkeleton />
          <View style={{ height: 8 }} />
          <RankingItemSkeleton />
          <View style={{ height: 8 }} />
          <RankingItemSkeleton />
          <View style={{ height: 8 }} />
          <RankingItemSkeleton />
        </View>
      </Screen>
    );
  }

  return (
    <Screen hasScroll headerType="default">
      <View style={styles.rankingPodiumContainer}>
        <RankingPodiumItem
          position={secondPlace.position}
          name={secondPlace.userName}
          totalCheckins={secondPlace.totalCheckins}
        />
        <RankingPodiumItem
          position={firstPlace.position}
          name={firstPlace.userName}
          totalCheckins={firstPlace.totalCheckins}
        />
        <RankingPodiumItem
          position={thirdPlace.position}
          name={thirdPlace.userName}
          totalCheckins={thirdPlace.totalCheckins}
        />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <FlashList
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          data={rest}
          renderItem={({ item }) => <RankingItem {...item} />}
        />
      </View>
    </Screen>
  );
}
