import { View } from "react-native";
import { RankingItemSkeleton } from "./RankingItemSkeleton";
import { RankingPodiumItemSkeleton } from "./RankingPodiumItemSkeleton";
import { styles } from "./styles";

export function RankingSkeleton() {
  return (
    <>
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
    </>
  );
}
