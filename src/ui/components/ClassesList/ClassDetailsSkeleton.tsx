import React from "react";
import { View, StyleSheet } from "react-native";
import { SkeletonBox } from "../SkeletonBox";
import { theme } from "@ui/styles/theme";

interface CompetitionCardSkeletonProps {
  variant?: "list" | "empty";
}

export function ClassDetailsSkeleton({ count = 3, variant = "list" }) {
  if (variant === "empty") {
    return <CompetitionEmptyStateSkeleton />;
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <CompetitionCardSkeleton key={`skeleton-${index}`} variant="list" />
      ))}
    </View>
  );
}

export function CompetitionCardSkeleton({
  variant = "list",
}: CompetitionCardSkeletonProps) {
  if (variant === "empty") {
    return <CompetitionEmptyStateSkeleton />;
  }

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        {/* Header */}

        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.userLeft}>
            <SkeletonBox width={40} height={40} borderRadius={20} />
            <View style={styles.userText}>
              <SkeletonBox width={80} height={14} borderRadius={4} />
              <SkeletonBox
                width={60}
                height={12}
                borderRadius={4}
                style={{ marginTop: 4 }}
              />
            </View>
          </View>
          <SkeletonBox width={50} height={20} borderRadius={10} />
        </View>
      </View>
    </View>
  );
}

function CompetitionEmptyStateSkeleton() {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <SkeletonBox width={120} height={20} borderRadius={4} />
          <SkeletonBox
            width={140}
            height={14}
            borderRadius={4}
            style={{ marginTop: 4 }}
          />
        </View>

        {/* Content Area */}
        <View style={styles.content}>
          {/* Icon Circle */}
          <View style={styles.iconContainer}>
            <SkeletonBox width={64} height={64} borderRadius={32} />
          </View>

          {/* Main Text */}
          <View style={styles.textContainer}>
            <SkeletonBox width={200} height={16} borderRadius={4} />
            <SkeletonBox
              width={160}
              height={14}
              borderRadius={4}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <SkeletonBox width="100%" height={48} borderRadius={8} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: theme.colors.white?.[400],
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userText: {
    gap: 4,
  },
  content: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  iconContainer: {
    marginBottom: 16,
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
  },
  buttonContainer: {
    marginTop: 8,
  },
});
