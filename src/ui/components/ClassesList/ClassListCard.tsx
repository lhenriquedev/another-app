import { View, Pressable } from "react-native";
import { styles } from "./styles";
import { IClass } from "./class.types";
import { formatTime } from "./utils";
import { AppText } from "../AppText";

interface IClassListCard {
  item: IClass;
  onClassPress: (classId: string) => void;
}

export function ClassListCard({ item, onClassPress }: IClassListCard) {
  return (
    <View style={styles.cardWrapper} key={item.id}>
      <Pressable
        style={({ pressed }) => [
          styles.classItem,
          getStatusStyle(item.status),
          pressed && styles.classItemPressed,
        ]}
        onPress={() => onClassPress?.(item.id)}
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
