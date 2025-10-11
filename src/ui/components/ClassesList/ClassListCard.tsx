import { View, Pressable } from "react-native";
import { styles } from "./styles";
import { IClass } from "./class.types";
import { formatTime } from "./utils";
import { AppText } from "../AppText";

interface IClassListCard {
  item: IClass;
  isLast: boolean;
  isFirst: boolean;
  isLastInGroup: boolean;
  onClassPress: (classId: IClass) => void;
}

export function ClassListCard({
  item,
  isLast,
  isFirst,
  isLastInGroup,
  onClassPress,
}: IClassListCard) {
  return (
    <View
      style={[
        styles.cardWrapper,
        isLastInGroup && styles.cardWrapperWithBorder,
      ]}
      key={item.id}
    >
      <View style={styles.timelineContainer}>
        {isFirst ? (
          <>
            <View style={styles.timelineDot} />
            {!isLast && <View style={styles.timelineLine} />}
          </>
        ) : (
          <>
            <View style={styles.timelineLine} />
          </>
        )}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.classItem,
          getStatusStyle(item.status),
          pressed && styles.classItemPressed,
        ]}
        onPress={() => onClassPress?.(item)}
      >
        <View style={styles.classDetails}>
          <View style={styles.detailRow}>
            <AppText size="xs">
              {formatTime(item.startTime)} - {formatTime(item.endTime)}
            </AppText>
          </View>

          <View style={styles.detailRow}>
            <AppText size="md" weight="semiBold">
              {item.instructor.name}
            </AppText>
          </View>

          <View style={styles.detailRow}>
            <AppText size="sm">{item.category.type}</AppText>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const getStatusStyle = (status: IClass["status"]) => {
  const styles: Record<IClass["status"], { borderLeftColor: string }> = {
    "in-progress": { borderLeftColor: "#a6c4a3" },
    finished: { borderLeftColor: "#F44336" },
    "not-started": { borderLeftColor: "#d6c555" },
  };
  return styles[status];
};
