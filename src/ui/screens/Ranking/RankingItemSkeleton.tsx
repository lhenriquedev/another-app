import { SkeletonBox } from "@ui/components/SkeletonBox";
import { theme } from "@ui/styles/theme";
import { View } from "react-native";

export function RankingItemSkeleton() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.platinum.DEFAULT,
        backgroundColor: theme.colors.white[400],
      }}
    >
      <SkeletonBox width={24} height={24} borderRadius={4} />

      <SkeletonBox
        width={48}
        height={48}
        borderRadius={24}
        style={{ marginLeft: 12 }}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <SkeletonBox width="70%" height={16} style={{ marginBottom: 6 }} />
        <SkeletonBox width="40%" height={14} />
      </View>

      <SkeletonBox width={40} height={20} borderRadius={4} />
    </View>
  );
}
