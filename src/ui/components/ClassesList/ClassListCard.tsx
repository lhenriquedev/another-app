import { View, Pressable, Text } from "react-native";
import { styles } from "./styles";
import { getStatusLabel, formatTime } from "./utils";
import { IClass } from "./class.types";

interface IClassListCard {
  item: IClass;
  isLast: boolean;
  isFirst: boolean;
  onClassPress: (item: IClass) => void;
}

export function ClassListCard({
  item,
  isLast,
  isFirst,
  onClassPress,
}: IClassListCard) {
  return (
    <View style={styles.cardWrapper} key={item.id}>
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
          pressed && styles.classItemPressed,
        ]}
        onPress={() => onClassPress?.(item)}
      >
        <View style={styles.classHeader}>
          <View style={styles.classMainInfo}>
            <Text>{item.title}</Text>
            {item.description && (
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            )}
          </View>

          <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
            <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
          </View>
        </View>

        <View style={styles.classDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🕐</Text>
            <Text style={styles.time}>
              {formatTime(item.startTime)} - {formatTime(item.endTime)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>👤</Text>
            <Text style={styles.instructor}>{item.instructor.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🥋</Text>
            <Text style={styles.category}>{item.category.type}</Text>
          </View>
        </View>

        <View style={styles.classFooter}>
          <View
            style={[
              styles.capacityBadge,
              item.checkinsSummary.available === 0 && styles.capacityBadgeFull,
            ]}
          >
            <Text
              style={[
                styles.capacity,
                item.checkinsSummary.available === 0 && styles.capacityFull,
              ]}
            >
              {item.checkinsSummary.available === 0 ? "🔴" : "🟢"}{" "}
              {item.checkinsSummary.available}/{item.capacity} vagas
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const getStatusStyle = (status: IClass["status"]) => {
  const styles: Record<IClass["status"], { backgroundColor: string }> = {
    "in-progress": { backgroundColor: "#4CAF50" },
    finished: { backgroundColor: "#9E9E9E" },
    "not-started": { backgroundColor: "#F44336" },
  };
  return styles[status];
};
