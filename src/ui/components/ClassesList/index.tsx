import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import { IClass } from "./class.types";
import { groupClassesByHourRange } from "./utils";
import { ClassListBottomSheet } from "./ClassListBottomSheet";
import { IClassListBottomSheet } from "./IClassListBottomSheet";
import { styles } from "./styles";
import { AppText } from "../AppText";
import { theme } from "@ui/styles/theme";
import { FlashList } from "@shopify/flash-list";
import { AnimatedClassListCard } from "../AnimatedClassListCard";

interface ClassListProps {
  classes: IClass[];
  onClassPress?: (classItem: IClass) => void;
}

interface IClassCardProps {
  item: IClass;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isLastInGroup: boolean;
  onClassPress: (item: IClass) => void;
}

export const ClassList: React.FC<ClassListProps> = ({ classes }) => {
  const bottomSheetRef = useRef<IClassListBottomSheet>(null);
  const hourRangeGroups = groupClassesByHourRange(classes);

  const renderClassCard = ({
    item,
    isFirst,
    isLast,
    index,
    isLastInGroup,
    onClassPress,
  }: IClassCardProps) => (
    <AnimatedClassListCard
      item={item}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
      isLastInGroup={isLastInGroup}
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
                <AppText
                  color={theme.colors.black[600]}
                  weight="medium"
                  size="xs"
                >
                  {startHour}h
                </AppText>
                <AppText
                  color={theme.colors.black[600]}
                  weight="medium"
                  size="xs"
                >
                  -
                </AppText>
                <AppText
                  color={theme.colors.black[600]}
                  weight="medium"
                  size="xs"
                >
                  {endHour}h
                </AppText>
              </View>

              <View style={styles.cardsColumn}>
                <FlashList
                  data={classes}
                  renderItem={({ item, index }) =>
                    renderClassCard({
                      item,
                      index,
                      isFirst: index === 0,
                      isLast: index === classes.length - 1 && isLastGroup,
                      isLastInGroup: index === classes.length - 1,
                      onClassPress: () => bottomSheetRef.current?.open(item.id),
                    })
                  }
                />
              </View>
            </View>
          );
        })}
      </ScrollView>

      <ClassListBottomSheet ref={bottomSheetRef} />
    </>
  );
};
