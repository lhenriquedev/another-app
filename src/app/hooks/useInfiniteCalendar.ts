import { FlashListRef } from '@shopify/flash-list';
import { useState, useRef, useCallback, useMemo } from "react";
import { addDays, subDays, startOfDay, isSameDay, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IDateItem {
  date: Date;
  dayOfWeek: string;
  dayOfMonth: string;
  month: string;
  year: string;
  isToday: boolean;
}

interface IUseInfiniteCalendarOptions {
  initialDaysBefore?: number;
  initialDaysAfter?: number;
  daysToAppend?: number;
  scrollThreshold?: number;
  initialSelectedDate?: Date;
  formatDayOfWeek?: (date: Date) => string;
  formatDayOfMonth?: (date: Date) => string;
  formatMonth?: (date: Date) => string;
  formatYear?: (date: Date) => string;
}

export function useInfiniteCalendar(options: IUseInfiniteCalendarOptions = {}) {
  const {
    initialDaysBefore = 30,
    initialDaysAfter = 60,
    daysToAppend = 30,
    scrollThreshold = 5,
    initialSelectedDate = startOfDay(new Date()),
    formatDayOfWeek,
    formatDayOfMonth,
    formatMonth,
    formatYear,
  } = options;

  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfDay(initialSelectedDate),
  );

  const [dateRange, setDateRange] = useState({
    startDate: subDays(startOfDay(new Date()), initialDaysBefore),
    endDate: addDays(startOfDay(new Date()), initialDaysAfter),
  });

  const listRef = useRef<FlashListRef<IDateItem>>(null);
  const isLoadingRef = useRef(false);

  const defaultFormatDayOfWeek = useCallback((date: Date): string => {
    return format(date, "EEE", { locale: ptBR });
  }, []);

  const defaultFormatDayOfMonth = useCallback((date: Date): string => {
    return format(date, "dd");
  }, []);

  const defaultFormatMonth = useCallback((date: Date): string => {
    return format(date, "MMM", { locale: ptBR });
  }, []);

  const defaultFormatYear = useCallback((date: Date): string => {
    return format(date, "yyyy");
  }, []);

  const dayOfWeekFormatter = formatDayOfWeek || defaultFormatDayOfWeek;
  const dayOfMonthFormatter = formatDayOfMonth || defaultFormatDayOfMonth;
  const monthFormatter = formatMonth || defaultFormatMonth;
  const yearFormatter = formatYear || defaultFormatYear;

  const dateItems: IDateItem[] = useMemo(() => {
    const items: IDateItem[] = [];
    const today = startOfDay(new Date());
    let currentDate = new Date(dateRange.startDate);

    while (currentDate <= dateRange.endDate) {
      const dateToFormat = new Date(currentDate);

      items.push({
        date: dateToFormat,
        dayOfWeek: dayOfWeekFormatter(dateToFormat),
        dayOfMonth: dayOfMonthFormatter(dateToFormat),
        month: monthFormatter(dateToFormat),
        year: yearFormatter(dateToFormat),
        isToday: isSameDay(dateToFormat, today),
      });

      currentDate = addDays(currentDate, 1);
    }

    return items;
  }, [
    dateRange.startDate,
    dateRange.endDate,
    dayOfWeekFormatter,
    dayOfMonthFormatter,
    monthFormatter,
    yearFormatter,
  ]);

  const todayIndex = useMemo(() => {
    return dateItems.findIndex((item) => item.isToday);
  }, [dateItems]);

  const prependDays = useCallback(() => {
    if (isLoadingRef.current) { return; }

    isLoadingRef.current = true;

    setDateRange((prev) => ({
      startDate: subDays(prev.startDate, daysToAppend),
      endDate: prev.endDate,
    }));

    setTimeout(() => {
      isLoadingRef.current = false;
    }, 300);
  }, [daysToAppend]);

  const appendDays = useCallback(() => {
    if (isLoadingRef.current) { return; }

    isLoadingRef.current = true;

    setDateRange((prev) => ({
      startDate: prev.startDate,
      endDate: addDays(prev.endDate, daysToAppend),
    }));

    setTimeout(() => {
      isLoadingRef.current = false;
    }, 300);
  }, [daysToAppend]);

  const handleScroll = useCallback(
    (scrollOffset: number, contentWidth: number, viewWidth: number) => {
      if (isLoadingRef.current) { return; }

      const itemWidth = 70;
      const scrollPositionInItems = scrollOffset / itemWidth;
      const thresholdDistance = scrollThreshold;

      if (scrollPositionInItems < thresholdDistance) {
        prependDays();
      }

      const maxScrollInItems = (contentWidth - viewWidth) / itemWidth;
      if (scrollPositionInItems > maxScrollInItems - thresholdDistance) {
        appendDays();
      }
    },
    [scrollThreshold, prependDays, appendDays],
  );

  const selectDate = useCallback((dateItem: IDateItem, index: number) => {
    setSelectedDate(dateItem.date);

    listRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }, []);

  const scrollToToday = useCallback(() => {
    if (todayIndex === -1) { return; }

    const todayDate = startOfDay(new Date());
    setSelectedDate(todayDate);

    listRef.current?.scrollToIndex({
      index: todayIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [todayIndex]);

  const onScrollHandler = useCallback(
    (event: any) => {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;

      handleScroll(
        contentOffset.x,
        contentSize.width,
        layoutMeasurement.width,
      );
    },
    [handleScroll],
  );

  return {
    dateItems,
    selectedDate,
    todayIndex,
    listRef,
    selectDate,
    scrollToToday,
    onScrollHandler,
    isToday: isSameDay(selectedDate, startOfDay(new Date())),
  };
}
