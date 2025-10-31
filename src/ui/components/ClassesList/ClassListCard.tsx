import { View, Pressable } from "react-native";
import { styles } from "./styles";
import { IClass } from "./class.types";
import { formatTime } from "./utils";
import { AppText } from "../AppText";
import { User } from "lucide-react-native";
import { theme } from "@ui/styles/theme";

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
          pressed && styles.pressed,
          getStatusStyle(item.status),
        ]}
        onPress={() => onClassPress?.(item.id)}
      >
        <View style={styles.title}>
          <AppText weight="semiBold">{item.title}</AppText>
          <AppText size="xs">
            {formatTime(item.startTime)} - {formatTime(item.endTime)}
          </AppText>
        </View>

        <View style={styles.instructor}>
          <User size={16} color={theme.colors.mutedText} />
          <AppText size="sm" weight="medium" color={theme.colors.mutedText}>
            {item.instructor.name}
          </AppText>
        </View>

        <View style={styles.category}>
          <AppText size="xs" weight="semiBold">
            {item.category.type}
          </AppText>
        </View>
      </Pressable>
    </View>
  );
}

const getStatusStyle = (status: IClass["status"]) => {
  const styles: Record<IClass["status"], { borderLeftColor: string }> = {
    "in-progress": { borderLeftColor: theme.colors.success },
    finished: { borderLeftColor: theme.colors.accent },
    "not-started": { borderLeftColor: theme.colors.primary },
  };
  return styles[status];
};
