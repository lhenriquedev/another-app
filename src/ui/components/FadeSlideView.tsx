import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

interface FadeSlideViewProps {
  children: React.ReactNode;
  triggerKey?: string | number;
  duration?: number;
  slideDistance?: number;
  delay?: number;
  style?: ViewStyle;
}

export function FadeSlideView({
  children,
  triggerKey,
  duration = 300,
  slideDistance = 10,
  delay = 0,
  style,
}: FadeSlideViewProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(slideDistance)).current;

  useEffect(() => {
    // Reset animação
    fadeAnim.setValue(0);
    slideAnim.setValue(slideDistance);

    // Anima entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [triggerKey, fadeAnim, slideAnim, duration, slideDistance, delay]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
