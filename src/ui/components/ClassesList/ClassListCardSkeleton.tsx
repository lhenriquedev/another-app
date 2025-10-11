import React from "react";
import { View, StyleSheet } from "react-native";
import { SkeletonBox } from "../SkeletonBox";
import { theme } from "@ui/styles/theme";

interface ClassListCardSkeletonProps {
  isFirst?: boolean;
  isLast?: boolean;
  isLastInGroup?: boolean;
}

export function ClassListSkeleton({ count = 5 }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <ClassListCardSkeleton
          key={`skeleton-${index}`}
          isFirst={index === 0}
          isLast={index === count - 1}
          isLastInGroup={index === count - 1 || (index + 1) % 3 === 0}
        />
      ))}
    </View>
  );
}

export function ClassListCardSkeleton({
  isFirst = false,
  isLast = false,
  isLastInGroup = false,
}: ClassListCardSkeletonProps) {
  return (
    <View
      style={[
        styles.cardWrapper,
        isLastInGroup && styles.cardWrapperWithBorder,
      ]}
    >
      <View style={styles.timelineContainer}>
        {isFirst ? (
          <>
            <View style={styles.timelineDot} />
            {!isLast && <View style={styles.timelineLine} />}
          </>
        ) : (
          <View style={styles.timelineLine} />
        )}
      </View>

      <View style={styles.classItem}>
        <View style={styles.classDetails}>
          {/* Horário */}
          <View style={styles.detailRow}>
            <SkeletonBox width={120} height={14} borderRadius={4} />
          </View>

          {/* Instrutor */}
          <View style={styles.detailRow}>
            <SkeletonBox width={150} height={16} borderRadius={4} />
          </View>

          {/* Categoria */}
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
    borderBottomColor: "#E0E0E0",
    marginBottom: 16,
    paddingBottom: 16,
  },
  timelineContainer: {
    width: 24,
    alignItems: "center",
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E0E0E0",
    marginBottom: 4,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#E0E0E0",
  },
  classItem: {
    flex: 1,
    backgroundColor: theme.colors.white?.[400],
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#E0E0E0",
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
