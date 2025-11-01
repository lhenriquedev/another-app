import React from "react";
import { View, StyleSheet } from "react-native";
import { SkeletonBox } from "../SkeletonBox";
import { theme } from "@ui/styles/theme";

interface ClassDetailsSkeletonProps {
  count?: number;
}

export function ClassDetailsSkeleton({ count = 3 }: ClassDetailsSkeletonProps) {
  return (
    <View style={styles.container}>
      {/* Header Section - Category and Instructor */}
      <View style={styles.header}>
        <SkeletonBox width={150} height={24} borderRadius={4} />
        <View style={{ height: 4 }} />
        <SkeletonBox width={200} height={16} borderRadius={4} />
      </View>

      {/* Student Cards List */}
      <View style={styles.listContainer}>
        {Array.from({ length: count }).map((_, index) => (
          <View key={`skeleton-${index}`} style={styles.cardContainer}>
            <View style={styles.card}>
              {/* Left side - Avatar and User Info */}
              <View style={styles.leftContent}>
                <SkeletonBox width={32} height={32} borderRadius={16} />
                <View style={styles.userInfo}>
                  <SkeletonBox width={120} height={16} borderRadius={4} />
                  <View style={{ height: 4 }} />
                  <SkeletonBox width={80} height={12} borderRadius={4} />
                </View>
              </View>

              {/* Right side - Badge and Time */}
              <View style={styles.rightContent}>
                <SkeletonBox width={24} height={24} borderRadius={12} />
                <View style={{ height: 4 }} />
                <SkeletonBox width={50} height={12} borderRadius={4} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    marginBottom: 0,
  },
  listContainer: {
    gap: 8,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userInfo: {
    gap: 0,
  },
  rightContent: {
    alignItems: "center",
    gap: 0,
  },
});
