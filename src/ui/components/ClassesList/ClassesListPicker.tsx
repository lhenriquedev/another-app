// components/ClassesList/ClassesListPicker.tsx
import { FlashList } from "@shopify/flash-list";
import { format, startOfDay, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pressable, View, StyleSheet, Dimensions } from "react-native";
import { AppText } from "@ui/components/AppText";
import { useInfiniteCalendar } from "@app/hooks/useInfiniteCalendar";
import { theme } from "@ui/styles/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DATE_ITEM_WIDTH = 70;
interface ClassesListDatePickerProps {
  calendarControls: ReturnType<typeof useInfiniteCalendar>;
}

export function ClassesListDatePicker({
  calendarControls,
}: ClassesListDatePickerProps) {
  const {
    dateItems,
    selectedDate,
    todayIndex,
    listRef,
    selectDate,
    scrollToToday,
    onScrollHandler,
    isToday,
  } = calendarControls;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <AppText weight="semiBold" size="sm">
            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </AppText>
          <AppText size="sm" style={styles.yearText}>
            {format(selectedDate, "yyyy")}
          </AppText>
        </View>

        {!isToday && (
          <Pressable onPress={scrollToToday} style={styles.todayButton}>
            <AppText size="sm" weight="semiBold" style={styles.todayButtonText}>
              Hoje
            </AppText>
          </Pressable>
        )}
      </View>

      <View style={styles.dateScrollContainer}>
        <FlashList
          ref={listRef}
          data={dateItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.date.toISOString()}
          contentContainerStyle={{
            paddingHorizontal: (SCREEN_WIDTH - DATE_ITEM_WIDTH) / 2,
          }}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          initialScrollIndex={todayIndex !== -1 ? todayIndex : 30}
          renderItem={({ item, index }) => {
            const isSelected = isSameDay(item.date, selectedDate);
            const isPast = item.date < startOfDay(new Date());

            return (
              <Pressable
                onPress={() => selectDate(item, index)}
                style={[
                  styles.dateItem,
                  isSelected && styles.dateItemSelected,
                  item.isToday && !isSelected && styles.dateItemToday,
                  isPast && !isSelected && styles.dateItemPast,
                ]}
              >
                <AppText
                  size="xs"
                  weight="medium"
                  style={[
                    styles.dayOfWeek,
                    isSelected && styles.textSelected,
                    isPast && !isSelected && styles.textPast,
                  ]}
                >
                  {item.dayOfWeek}
                </AppText>
                <AppText
                  size="lg"
                  weight="semiBold"
                  style={[
                    styles.dayOfMonth,
                    isSelected && styles.textSelected,
                    isPast && !isSelected && styles.textPast,
                  ]}
                >
                  {item.dayOfMonth}
                </AppText>
                <AppText
                  size="xs"
                  style={[
                    styles.month,
                    isSelected && styles.textSelected,
                    isPast && !isSelected && styles.textPast,
                  ]}
                >
                  {item.month}
                </AppText>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white[400],
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.platinum.DEFAULT,
  },
  headerTextContainer: {
    flex: 1,
  },
  yearText: {
    color: theme.colors.black[500],
    marginTop: 2,
  },
  todayButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  todayButtonText: {
    color: theme.colors.white[400],
  },
  dateScrollContainer: {
    paddingVertical: 12,
  },
  dateItem: {
    width: DATE_ITEM_WIDTH,
    padding: 8,
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: theme.colors.white[600],
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  dateItemSelected: {
    backgroundColor: theme.colors.black[800],
  },
  dateItemToday: {
    borderWidth: 2,
    borderColor: theme.colors.black[800],
  },
  dateItemPast: {
    backgroundColor: theme.colors.white.DEFAULT,
  },
  dayOfWeek: {
    color: theme.colors.black[500],
    textTransform: "capitalize",
  },
  dayOfMonth: {
    color: "#000000",
  },
  month: {
    color: theme.colors.platinum[900],
    textTransform: "capitalize",
  },
  textSelected: {
    color: theme.colors.white[400],
  },
  textPast: {
    color: theme.colors.platinum[600],
  },
});
