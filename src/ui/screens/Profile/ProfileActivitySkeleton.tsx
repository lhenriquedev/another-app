import React from "react";
import { StyleSheet, View } from "react-native";
import { SkeletonBox } from "@ui/components/SkeletonBox";

type ListProps = {
  count?: number;
};

export function ProfileActivityListSkeleton({ count = 3 }: ListProps) {
  return (
    <View style={{ gap: 12 }}>
      {Array.from({ length: count }).map((_, idx) => (
        <ProfileActivityCardSkeleton key={idx} />
      ))}
    </View>
  );
}

export function ProfileActivityCardSkeleton() {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Carregando atividade"
    >
      <View style={styles.left}>
        <SkeletonBox height={18} borderRadius={6} />
        <SkeletonBox height={12} borderRadius={6} style={{ marginTop: 6 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // mesmo layout do seu card
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 8,
  },
  left: {
    flex: 1,
    gap: 4,
  },
  pill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
});
