import { useRef, useState, useEffect, useCallback } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isToday,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

const { width } = Dimensions.get('window');

interface IDatePickerProps {
  itemWidth?: number;
  paddingHorizontal?: number;
  marginHorizontal?: number;
  initialDate?: Date;
  selectedDate?: Date
  onDateChange?: (date: Date) => void
}

interface IFormatedDate {
  dayWeek: string;
  day: string;
  month: string;
}

export const useDatePicker = ({
  itemWidth = 60,
  paddingHorizontal = 10,
  marginHorizontal = 4,
  selectedDate = new Date(),
  onDateChange,
}: IDatePickerProps = {}) => {
  const [dates, setDates] = useState<Date[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);
  const hasScrolledToToday = useRef(false);

  const itemTotalWidth = itemWidth + marginHorizontal * 2;

  const generateDatesOfMonth = useCallback((date: Date): Date[] => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  }, []);

  const scrollToToday = useCallback(() => {
    if (hasScrolledToToday.current || dates.length === 0) { return; }

    const todayIndex = dates.findIndex((data) => isToday(data));

    if (todayIndex !== -1) {
      const itemPosition = todayIndex * itemTotalWidth + paddingHorizontal;
      const scrollPosition = itemPosition - width / 2 + itemTotalWidth / 2;

      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: Math.max(0, scrollPosition),
            animated: false,
          });
          hasScrolledToToday.current = true;
        }, 100);
      });
    }
  }, [dates, itemTotalWidth, paddingHorizontal]);

  const addMoreDatesAtEnd = useCallback(() => {
    if (dates.length === 0) { return; }

    const lastDate = dates[dates.length - 1];
    const nextDate = addMonths(lastDate, 1);
    const newDates = generateDatesOfMonth(nextDate);

    setDates((current) => [...current, ...newDates]);
  }, [dates, generateDatesOfMonth]);

  const addMoreDatesAtStart = useCallback(() => {
    if (dates.length === 0) { return; }

    const firstDate = dates[0];
    const previousDate = subMonths(firstDate, 1);
    const newDates = generateDatesOfMonth(previousDate);

    setDates((current) => {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: newDates.length * itemTotalWidth,
          animated: false,
        });
      }, 50);

      return [...newDates, ...current];
    });
  }, [dates, generateDatesOfMonth, itemTotalWidth]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const positionX = event.nativeEvent.contentOffset.x;
    const totalWidth = event.nativeEvent.contentSize.width;
    const visibleWidth = event.nativeEvent.layoutMeasurement.width;

    if (positionX + visibleWidth > totalWidth - 500) {
      addMoreDatesAtEnd();
    }

    if (positionX < 500) {
      addMoreDatesAtStart();
    }
  }, [addMoreDatesAtEnd, addMoreDatesAtStart]);

  const formatDate = useCallback((date: Date): IFormatedDate => {
    return {
      dayWeek: format(date, 'EEEEEE', { locale: ptBR }),
      day: format(date, 'd'),
      month: format(date, 'MMM', { locale: ptBR }),
    };
  }, []);

  const selectDate = useCallback((date: Date) => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [onDateChange]);

  const isDateSelected = useCallback((date: Date) => {
    return isSameDay(date, selectedDate);
  }, [selectedDate]);

  const isDateToday = useCallback((date: Date) => {
    return isToday(date);
  }, []);

  useEffect(() => {
    const today = new Date();
    const previousMonth = generateDatesOfMonth(subMonths(today, 1));
    const currentMonth = generateDatesOfMonth(today);
    const nextMonth = generateDatesOfMonth(addMonths(today, 1));

    setDates([...previousMonth, ...currentMonth, ...nextMonth]);
  }, [generateDatesOfMonth]);

  const getFormattedDateForAPI = useCallback(() => {
    return format(selectedDate, 'yyyy-MM-dd');
  }, [selectedDate]);

  return {
    selectedDate,
    dates,
    scrollViewRef,
    selectDate,
    isDateSelected,
    isDateToday,
    formatDate,
    handleScroll,
    scrollToToday,
    getFormattedDateForAPI,
  };
};
