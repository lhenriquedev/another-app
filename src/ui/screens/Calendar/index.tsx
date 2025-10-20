import { RefreshControl, View } from "react-native";
import { styles } from "./styles";
import { ClassList } from "@ui/components/ClassesList";
import { ClassesListDatePicker } from "@ui/components/ClassesList/ClassesListPicker";
import { useRef, useState } from "react";
import { useClasses } from "@ui/components/ClassesList/useClasses";
import { format } from "date-fns";
import { ClassListSkeleton } from "@ui/components/ClassesList/ClassListCardSkeleton";
import {
  ErrorEmptyState,
  NoClassesEmptyState,
} from "@ui/components/ClassesList/ClassListEmptyStates";
import { FadeSlideView } from "@ui/components/FadeSlideView";
import { IClassListBottomSheet } from "@ui/components/ClassesList/IClassListBottomSheet";
import { ClassListBottomSheet } from "@ui/components/ClassesList/ClassListBottomSheet";
import { FlashList } from "@shopify/flash-list";
import { ClassListCard } from "@ui/components/ClassesList/ClassListCard";
import { HomeHeader } from "@ui/components/HomeHeader";

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const bottomSheetRef = useRef<IClassListBottomSheet>(null);
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const {
    data: classes,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useClasses({
    date: formattedDate,
    order: "asc",
  });

  const handleOnClassIdPress = (classId: string) => {
    bottomSheetRef.current?.open();
    setSelectedClassId(classId);
  };

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
      <HomeHeader />

      <ClassesListDatePicker
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />

      {isLoading && <ClassListSkeleton count={4} />}

      {!isLoading && classes && classes?.length > 0 && (
        <FadeSlideView style={{ flex: 1 }}>
          <ClassList>
            <FlashList
              onRefresh={refetch}
              refreshControl={<RefreshControl refreshing={isFetching} />}
              data={classes}
              renderItem={({ item }) => (
                <ClassListCard
                  item={item}
                  onClassPress={handleOnClassIdPress}
                />
              )}
            />
          </ClassList>
        </FadeSlideView>
      )}

      {!isLoading && classes?.length === 0 && renderEmptyState()}

      <ClassListBottomSheet
        ref={bottomSheetRef}
        onSelectedClass={handleOnClassIdPress}
        selectedClassId={selectedClassId}
      />
    </View>
  );
}
