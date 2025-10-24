import { SkeletonBox } from "@ui/components/SkeletonBox";
import { View } from "react-native";
import { styles } from "./styles";

type RankingPodiumItemSkeletonProps = {
  isFirstPosition?: boolean;
};

export function RankingPodiumItemSkeleton({
  isFirstPosition = false,
}: RankingPodiumItemSkeletonProps) {
  return (
    <View
      style={[
        styles.rankingPodiumContent,
        isFirstPosition && { paddingBottom: 80 },
      ]}
    >
      <SkeletonBox width={24} height={24} borderRadius={12} />

      <SkeletonBox
        width={64}
        height={64}
        borderRadius={32}
        style={{ marginTop: 8 }}
      />

      <SkeletonBox width={60} height={16} style={{ marginTop: 8 }} />

      <SkeletonBox width={40} height={20} style={{ marginTop: 4 }} />
    </View>
  );
}
