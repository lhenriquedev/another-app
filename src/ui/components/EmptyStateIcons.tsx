import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { theme } from "@ui/styles/theme";

export function CalendarEmptyIcon() {
  return (
    <View style={styles.iconWrapper}>
      <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Calendário */}
        <Rect
          x="20"
          y="30"
          width="80"
          height="70"
          rx="8"
          fill={theme.colors.card}
          stroke={theme.colors.border}
          strokeWidth="2"
        />

        {/* Header do calendário */}
        <Rect x="20" y="30" width="80" height="20" rx="8" fill={theme.colors.primary} />

        {/* Argolas do calendário */}
        <Rect x="35" y="20" width="4" height="15" rx="2" fill={theme.colors.primary} />
        <Rect x="81" y="20" width="4" height="15" rx="2" fill={theme.colors.primary} />

        {/* X no meio (sem aulas) */}
        <G opacity="0.5">
          <Path
            d="M 45 60 L 75 90"
            stroke={theme.colors.mutedText}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <Path
            d="M 75 60 L 45 90"
            stroke={theme.colors.mutedText}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
}

export function SearchEmptyIcon() {
  return (
    <View style={styles.iconWrapper}>
      <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Lupa */}
        <Circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke={theme.colors.border}
          strokeWidth="4"
        />
        <Path
          d="M 68 68 L 85 85"
          stroke={theme.colors.border}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* X dentro da lupa */}
        <G opacity="0.5">
          <Path
            d="M 42 42 L 58 58"
            stroke={theme.colors.mutedText}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <Path
            d="M 58 42 L 42 58"
            stroke={theme.colors.mutedText}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
}

export function FilterEmptyIcon() {
  return (
    <View style={styles.iconWrapper}>
      <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Funil de filtro */}
        <Path
          d="M 30 30 L 90 30 L 70 60 L 70 90 L 50 90 L 50 60 Z"
          fill={theme.colors.card}
          stroke={theme.colors.border}
          strokeWidth="2"
        />

        {/* X no funil */}
        <G opacity="0.5">
          <Path
            d="M 50 50 L 70 70"
            stroke={theme.colors.mutedText}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <Path
            d="M 70 50 L 50 70"
            stroke={theme.colors.mutedText}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
}

export function ErrorIcon() {
  return (
    <View style={styles.iconWrapper}>
      <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Círculo de erro */}
        <Circle
          cx="60"
          cy="60"
          r="35"
          fill={theme.colors.card}
          stroke={theme.colors.accent}
          strokeWidth="3"
        />

        {/* Exclamação */}
        <Path
          d="M 60 40 L 60 65"
          stroke={theme.colors.accent}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <Circle cx="60" cy="75" r="3" fill={theme.colors.accent} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
