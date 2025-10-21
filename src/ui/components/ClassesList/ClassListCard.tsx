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
          <User size={16} color={theme.colors.platinum[900]} />
          <AppText size="sm" weight="medium" color={theme.colors.platinum[900]}>
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
    "in-progress": { borderLeftColor: "#a6c4a3" },
    finished: { borderLeftColor: "#F44336" },
    "not-started": { borderLeftColor: "#d6c555" },
  };
  return styles[status];
};
