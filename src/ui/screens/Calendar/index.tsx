import { FlashList } from "@shopify/flash-list";
import { ClassList } from "@ui/components/ClassesList";
import { ClassesListDatePicker } from "@ui/components/ClassesList/ClassesListPicker";
import { ClassListBottomSheet } from "@ui/components/ClassesList/ClassListBottomSheet";
import { ClassListCard } from "@ui/components/ClassesList/ClassListCard";
import { ClassListSkeleton } from "@ui/components/ClassesList/ClassListCardSkeleton";
import {
  ErrorEmptyState,
  NoClassesEmptyState,
} from "@ui/components/ClassesList/ClassListEmptyStates";
import { IClassListBottomSheet } from "@ui/components/ClassesList/IClassListBottomSheet";
import { useClasses } from "@ui/components/ClassesList/useClasses";
import { FadeSlideView } from "@ui/components/FadeSlideView";
import { Screen } from "@ui/components/Screen";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";

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
    <Screen hasScroll={false} headerType="default" style={{ flex: 1 }}>
      <View style={styles.container}>
        <ClassesListDatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        {isLoading && <ClassListSkeleton count={4} />}

        {!isLoading && classes && classes?.length > 0 && (
          <FadeSlideView
            style={{ flex: 1, marginTop: 32, paddingHorizontal: 16 }}
          >
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
