import { View } from "react-native";
import { styles } from "./styles";
import { ClassList } from "@ui/components/ClassesList";
import { AppHeader } from "@ui/components/AppHeader";
import { ClassesListDatePicker } from "@ui/components/ClassesList/ClassesListPicker";
import { useState } from "react";
import { useClasses } from "@ui/components/ClassesList/useClasses";
import { format } from "date-fns";
import { ClassListSkeleton } from "@ui/components/ClassesList/ClassListCardSkeleton";
import {
  ErrorEmptyState,
  NoClassesEmptyState,
} from "@ui/components/ClassesList/ClassListEmptyStates";
import { FadeSlideView } from "@ui/components/FadeSlideView";

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const {
    data: classes,
    isLoading,
    isError,
    refetch,
  } = useClasses({
    date: formattedDate,
    order: "asc",
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const renderEmptyState = () => {
    if (isError) {
      return <ErrorEmptyState onRetry={() => refetch()} />;
    }

    return <NoClassesEmptyState />;
  };

  return (
    <View style={styles.container}>
      <AppHeader />

      <ClassesListDatePicker
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />

      {isLoading && <ClassListSkeleton count={4} />}

      {!isLoading && classes && classes?.length > 0 && (
        <FadeSlideView style={{ flex: 1 }}>
          <ClassList classes={classes} />
        </FadeSlideView>
      )}

      {!isLoading && classes?.length === 0 && renderEmptyState()}
    </View>
  );
}
