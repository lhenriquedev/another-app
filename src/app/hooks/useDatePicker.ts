import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
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
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

interface IFormatedDate {
  dayWeek: string;
  day: string;
  month: string;
}

export const useDatePicker = ({
  itemWidth = 60,
  marginHorizontal = 4,
  selectedDate = new Date(),
  onDateChange,
}: IDatePickerProps = {}) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [currentVisibleMonth, setCurrentVisibleMonth] = useState(new Date());

  const scrollViewRef = useRef<ScrollView>(null);
  const hasScrolledToToday = useRef(false);

  const isNavigating = useRef(false);

  const itemTotalWidth = itemWidth + marginHorizontal * 2;

  const generateDatesOfMonth = useCallback((date: Date): Date[] => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  }, []);

  const addMoreDatesAtEnd = useCallback(() => {
    if (dates.length === 0) {
      return;
    }

    const lastDate = dates[dates.length - 1];
    const nextDate = addMonths(lastDate, 1);
    const newDates = generateDatesOfMonth(nextDate);

    setDates((current) => [...current, ...newDates]);
  }, [dates, generateDatesOfMonth]);

  const addMoreDatesAtStart = useCallback(() => {
    if (dates.length === 0) {
      return;
    }

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

  const updateVisibleMonth = useCallback(
    (scrollX: number) => {
      if (!hasScrolledToToday.current) {
        return;
      }

      if (isNavigating.current) {
        return;
      }

      const centerPosition = scrollX + width / 2;
      const centerIndex = Math.round(centerPosition / itemTotalWidth);
      const centerDate = dates[centerIndex];

      if (centerDate && !isSameMonth(centerDate, currentVisibleMonth)) {
        setCurrentVisibleMonth(centerDate);
      }
    },
    [dates, itemTotalWidth, currentVisibleMonth],
  );

  const scrollToToday = useCallback(() => {
    if (hasScrolledToToday.current || dates.length === 0) {
      return;
    }

    const todayIndex = dates.findIndex((data) => isToday(data));

    if (todayIndex !== -1) {
      const today = dates[todayIndex];
      setCurrentVisibleMonth(today);

      const itemPosition = todayIndex * itemTotalWidth;
      const scrollPosition = itemPosition - width / 2 + itemTotalWidth / 2;
      const finalPosition = Math.max(0, scrollPosition);

      scrollViewRef.current?.scrollTo({
        x: finalPosition,
        animated: true,
      });
      hasScrolledToToday.current = true;
    }
  }, [dates, itemTotalWidth]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const positionX = event.nativeEvent.contentOffset.x;
      const totalWidth = event.nativeEvent.contentSize.width;
      const visibleWidth = event.nativeEvent.layoutMeasurement.width;

      updateVisibleMonth(positionX);

      if (positionX + visibleWidth > totalWidth - 500) {
        addMoreDatesAtEnd();
      }

      if (positionX < 500) {
        addMoreDatesAtStart();
      }
    },
    [addMoreDatesAtEnd, addMoreDatesAtStart, updateVisibleMonth],
  );

  const formatDate = useCallback((date: Date): IFormatedDate => {
    const fullDayName = format(date, 'EEEE', { locale: ptBR });

    return {
      dayWeek: fullDayName.charAt(0).toUpperCase(),
      day: format(date, 'd'),
      month: format(date, 'MMM', { locale: ptBR }),
    };
  }, []);

  const selectDate = useCallback(
    (date: Date) => {
      if (onDateChange) {
        onDateChange(date);
      }
    },
    [onDateChange],
  );

  const isDateSelected = useCallback(
    (date: Date) => {
      return isSameDay(date, selectedDate);
    },
    [selectedDate],
  );

  const isDateToday = useCallback((date: Date) => {
    return isToday(date);
  }, []);

  // Função melhorada para navegar ao mês anterior
  const goToPreviousMonth = useCallback(() => {
    const previousMonth = subMonths(currentVisibleMonth, 1);

    // Primeiro, verifica se o mês anterior já existe no nosso array de datas
    const targetIndex = dates.findIndex(date =>
      isSameMonth(date, previousMonth) && date.getDate() === 1,
    );

    // Se o mês anterior não foi encontrado, significa que precisamos carregá-lo
    if (targetIndex === -1) {
      // Gera as datas do mês anterior
      const previousMonthDates = generateDatesOfMonth(previousMonth);

      // Adiciona essas datas no INÍCIO do array
      setDates((current) => {
        const newDates = [...previousMonthDates, ...current];

        // Agora que adicionamos o mês, precisamos ajustar o scroll
        // para compensar o conteúdo novo que foi inserido no início
        // Fazemos isso de forma assíncrona para dar tempo ao React renderizar
        setTimeout(() => {
          // Ajusta a posição atual para compensar o novo conteúdo
          scrollViewRef.current?.scrollTo({
            x: previousMonthDates.length * itemTotalWidth,
            animated: false,
          });

          // Agora que o conteúdo está ajustado, podemos fazer o scroll
          // para o primeiro dia do mês anterior
          // Como adicionamos o mês no início, sabemos que ele começa no índice 0
          scrollViewRef.current?.scrollTo({
            x: 0,
            animated: true,
          });
        }, 100);

        return newDates;
      });

      // Ativa a flag de navegação e atualiza o mês visível
      isNavigating.current = true;
      setCurrentVisibleMonth(previousMonth);

      setTimeout(() => {
        isNavigating.current = false;
      }, 600); // Aumentamos um pouco o tempo por causa dos scrolls duplos

    } else {
      // O mês anterior já existe, podemos fazer o scroll normalmente
      isNavigating.current = true;
      setCurrentVisibleMonth(previousMonth);

      const scrollPosition = targetIndex * itemTotalWidth;

      scrollViewRef.current?.scrollTo({
        x: Math.max(0, scrollPosition),
        animated: true,
      });

      setTimeout(() => {
        isNavigating.current = false;
      }, 500);
    }
  }, [currentVisibleMonth, dates, itemTotalWidth, generateDatesOfMonth]);

  // Função melhorada para navegar ao próximo mês
  const goToNextMonth = useCallback(() => {
    const nextMonth = addMonths(currentVisibleMonth, 1);

    // Verifica se o próximo mês já existe no array
    const targetIndex = dates.findIndex(date =>
      isSameMonth(date, nextMonth) && date.getDate() === 1,
    );

    // Se não existe, precisamos carregá-lo
    if (targetIndex === -1) {
      // Gera as datas do próximo mês
      const nextMonthDates = generateDatesOfMonth(nextMonth);

      // Adiciona essas datas no FINAL do array
      setDates((current) => {
        const newDates = [...current, ...nextMonthDates];

        // Calcula onde está o primeiro dia do novo mês que acabamos de adicionar
        // Como adicionamos no final, ele começa no índice igual ao tamanho do array anterior
        const newTargetIndex = current.length;
        const scrollPosition = newTargetIndex * itemTotalWidth;

        // Esperamos um pouco para o React renderizar o novo conteúdo
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: scrollPosition,
            animated: true,
          });
        }, 100);

        return newDates;
      });

      // Ativa a flag de navegação e atualiza o mês visível
      isNavigating.current = true;
      setCurrentVisibleMonth(nextMonth);

      setTimeout(() => {
        isNavigating.current = false;
      }, 600);

    } else {
      // O próximo mês já existe, scroll normal
      isNavigating.current = true;
      setCurrentVisibleMonth(nextMonth);

      const scrollPosition = targetIndex * itemTotalWidth;

      scrollViewRef.current?.scrollTo({
        x: Math.max(0, scrollPosition),
        animated: true,
      });

      setTimeout(() => {
        isNavigating.current = false;
      }, 500);
    }
  }, [currentVisibleMonth, dates, itemTotalWidth, generateDatesOfMonth]);

  const getFormattedMonthYear = useCallback(() => {
    return format(currentVisibleMonth, 'MMMM \'de\' yyyy', { locale: ptBR });
  }, [currentVisibleMonth]);

  useEffect(() => {
    const today = new Date();
    const previousMonth = generateDatesOfMonth(subMonths(today, 1));
    const currentMonth = generateDatesOfMonth(today);
    const nextMonth = generateDatesOfMonth(addMonths(today, 1));

    setDates([...previousMonth, ...currentMonth, ...nextMonth]);
  }, [generateDatesOfMonth]);

  useEffect(() => {
    if (dates.length > 0 && !hasScrolledToToday.current) {
      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          scrollToToday();
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [dates, scrollToToday]);

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
    currentVisibleMonth,
    getFormattedMonthYear,
    goToPreviousMonth,
    goToNextMonth,
  };
};
