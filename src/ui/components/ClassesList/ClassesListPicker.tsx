import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDatePicker } from "@app/hooks/useDatePicker";
import { DateItem } from "./DatePickerItem";
import { theme } from "@ui/styles/theme";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

const ITEM_WIDTH = 40;
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
    getFormattedMonthYear,
    goToPreviousMonth,
    goToNextMonth,
  } = useDatePicker({
    itemWidth: ITEM_WIDTH,
    marginHorizontal: MARGIN_HORIZONTAL,
    selectedDate,
    onDateChange,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goToPreviousMonth}
          style={styles.arrowButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <ChevronLeft />
        </TouchableOpacity>

        <Text style={styles.monthYearText}>{getFormattedMonthYear()}</Text>

        <TouchableOpacity
          onPress={goToNextMonth}
          style={styles.arrowButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <ChevronRight />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
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
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.black[600],
    textTransform: "capitalize",
    flex: 1,
    textAlign: "center",
  },
  arrowButton: {
    padding: 8,
    borderRadius: 8,
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
});
