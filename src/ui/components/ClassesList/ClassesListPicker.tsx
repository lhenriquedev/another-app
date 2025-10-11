import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useDatePicker } from "./useDatePicker";
import { DateItem } from "./DatePickerItem";
import { theme } from "@ui/styles/theme";

const ITEM_WIDTH = 60;
const PADDING_HORIZONTAL = 10;
const MARGIN_HORIZONTAL = 4;

interface IClassListDatePickerProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

export function ClassesListDatePicker({
  selectedDate,
  onDateChange,
}: IClassListDatePickerProps) {
  const {
    dates,
    scrollViewRef,
    selectDate,
    isDateSelected,
    isDateToday,
    formatDate,
    handleScroll,
    scrollToToday,
  } = useDatePicker({
    itemWidth: ITEM_WIDTH,
    paddingHorizontal: PADDING_HORIZONTAL,
    marginHorizontal: MARGIN_HORIZONTAL,
    selectedDate,
    onDateChange,
  });

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        onContentSizeChange={scrollToToday}
      >
        {dates.map((date, index) => {
          const { day, dayWeek, month } = formatDate(date);
          const selected = isDateSelected(date);
          const today = isDateToday(date);

          return (
            <DateItem
              key={`${date.getTime()}-${index}`}
              dayWeek={dayWeek}
              day={day}
              month={month}
              isSelected={selected}
              isToday={today}
              onPress={() => selectDate(date)}
              itemWidth={ITEM_WIDTH}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 20,
    paddingBottom: 32,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  monthYearText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textTransform: "capitalize",
  },
  scrollContent: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
});
