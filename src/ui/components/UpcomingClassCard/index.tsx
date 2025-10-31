import { TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";
import { formatTime } from "../ClassesList/utils";
import { theme } from "@ui/styles/theme";

interface IUpcomingClassesCardProps {
  id: string;
  startTime: string;
  capacity: number;
  instructor: string;
  category: string;
  onClassPress: (classId: string) => void;
  totalItems: number;
}

export function UpcomingClassesCard({
  id,
  capacity,
  category,
  instructor,
  startTime,
  onClassPress,
  totalItems,
}: IUpcomingClassesCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, styles.getWidth(totalItems)]}
      onPress={() => onClassPress(id)}
    >
      <View style={styles.content}>
        <View>
          <AppText weight="semiBold" size="sm">
            {category}
          </AppText>
          <AppText size="xs" color={theme.colors.mutedText}>
            {instructor}
          </AppText>
        </View>
        <View>
          <AppText weight="semiBold" size="sm">
            {formatTime(startTime)}
          </AppText>
          <AppText size="xs" color={theme.colors.mutedText}>
            {capacity} vagas
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
