import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import { IClass, IClassesResponse } from "./class.types";
import { groupClassesByHourRange } from "./utils";
import { ClassListBottomSheet } from "./ClassListBottomSheet";
import { IClassListBottomSheet } from "./IClassListBottomSheet";
import { ClassListCard } from "./ClassListCard";
import { styles } from "./styles";
import { AppText } from "../AppText";

interface ClassListProps {
  response: IClassesResponse;
  onClassPress?: (classItem: IClass) => void;
}

interface IClassCardProps {
  item: IClass;
  isFirst: boolean;
  isLast: boolean;
  onClassPress: (item: IClass) => void;
}

export const ClassList: React.FC<ClassListProps> = ({ response }) => {
  const bottomSheetRef = useRef<IClassListBottomSheet>(null);
  const hourRangeGroups = groupClassesByHourRange(response.classes);

  const renderClassCard = ({
    item,
    isFirst,
    isLast,
    onClassPress,
  }: IClassCardProps) => (
    <ClassListCard
      item={item}
      isFirst={isFirst}
      isLast={isLast}
      onClassPress={onClassPress}
    />
  );

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {hourRangeGroups.map((hourRangeGroup, groupIndex) => {
          const { hourRange, classes } = hourRangeGroup;
          const [startHour, endHour] = hourRange.split("-");
          const isLastGroup = groupIndex === hourRangeGroups.length - 1;

          return (
            <View key={hourRange} style={styles.hourRangeGroup}>
              <View style={styles.hourColumn}>
                <AppText weight="medium" size="xs">
                  {startHour}h
                </AppText>
                <AppText weight="medium" size="xs">
                  -
                </AppText>
                <AppText weight="medium" size="xs">
                  {endHour}h
                </AppText>
              </View>

              <View style={styles.cardsColumn}>
                {classes.map((classItem, index) =>
                  renderClassCard({
                    item: classItem,
                    isFirst: index === 0,
                    isLast: index === classes.length - 1 && isLastGroup,
                    onClassPress: () => bottomSheetRef.current?.open(),
                  })
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <ClassListBottomSheet ref={bottomSheetRef} />
    </>
  );
};
