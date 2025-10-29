import { theme } from "@ui/styles/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import { FadeSlideView } from "./FadeSlideView";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <FadeSlideView style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <View style={styles.textContainer}>
        <AppText size="md" weight="semiBold" color={theme.colors.black[800]}>
          {title}
        </AppText>

        {description && (
          <AppText
            size="xs"
            color={theme.colors.platinum[900]}
            style={styles.description}
          >
            {description}
          </AppText>
        )}
      </View>

      {action && <View style={styles.actionContainer}>{action}</View>}
    </FadeSlideView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 48,
    backgroundColor: theme.colors.white[400],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.platinum.DEFAULT,
  },
  iconContainer: {
    marginBottom: 24,
  },
  textContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  description: {
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  actionContainer: {
    width: "100%",
    maxWidth: 280,
  },
});
