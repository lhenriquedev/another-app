import { theme } from "@ui/styles/theme";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
    <View style={[styles.container, { width: itemWidth }]}>
      {/* Letra do dia da semana acima do botão */}
      <AppText size="xs" style={styles.dayWeekText}>
        {dayWeek}
      </AppText>

      {/* Botão circular com o número do dia */}
      <TouchableOpacity
        style={[
          styles.button,
          isSelected && styles.buttonSelected,
          isToday && !isSelected && styles.buttonToday,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <AppText style={[styles.dayText, isSelected && styles.dayTextSelected]}>
          {day}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export const DateItem = memo(DateItemComponent);

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  dayWeekText: {
    color: theme.colors.black[700],
    marginBottom: 4,
    fontWeight: "500",
  },

  button: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  buttonSelected: {
    backgroundColor: theme.colors.black[800],
  },

  buttonToday: {
    borderWidth: 1,
    borderColor: theme.colors.platinum[600],
  },

  dayText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.black[700],
  },

  dayTextSelected: {
    color: theme.colors.white[400],
  },
});
