import { theme } from "@ui/styles/theme";
import React, { memo } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AppText } from "../AppText";

interface DateItemProps {
  dayWeek: string;
  day: string;
  month: string;
  isSelected: boolean;
  isToday: boolean;
  onPress: () => void;
  itemWidth: number;
}

const DateItemComponent = ({
  dayWeek,
  day,
  isSelected,
  isToday,
  onPress,
  itemWidth,
}: DateItemProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: itemWidth },
        isSelected && styles.selected,
        isToday && !isSelected && styles.today,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AppText size="xs" style={[isSelected && styles.selectedText]}>
        {dayWeek}
      </AppText>
      <AppText style={[styles.day, isSelected && styles.selectedText]}>
        {day}
      </AppText>
    </TouchableOpacity>
  );
};

export const DateItem = memo(DateItemComponent);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    // paddingHorizontal: 8,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white[400],
    borderRadius: 10,
    shadowColor: theme.colors.black[700],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  selected: {
    backgroundColor: theme.colors.black[500],
  },
  today: {
    borderWidth: 2,
    borderColor: theme.colors.platinum[600],
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  month: {
    fontSize: 11,
    color: "#666",
  },
  selectedText: {
    color: "#fff",
  },
});
