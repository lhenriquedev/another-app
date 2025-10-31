import { theme } from "@ui/styles/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SkeletonBox } from "../SkeletonBox";

export function ClassListSkeleton({ count = 5 }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <ClassListCardSkeleton key={`skeleton-${index}`} />
      ))}
    </View>
  );
}

export function ClassListCardSkeleton() {
  return (
    <View style={[styles.cardWrapper]}>
      <View style={styles.classItem}>
        <View style={styles.classDetails}>
          <View style={styles.detailRow}>
            <SkeletonBox width={120} height={14} borderRadius={4} />
          </View>

          <View style={styles.detailRow}>
            <SkeletonBox width={150} height={16} borderRadius={4} />
          </View>

          <View style={styles.detailRow}>
            <SkeletonBox width={100} height={14} borderRadius={4} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  cardWrapperWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: 16,
    paddingBottom: 16,
  },
  classItem: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 4,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  classDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    padding: 16,
  },
});
