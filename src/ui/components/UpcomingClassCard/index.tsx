import { TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Users2 } from "lucide-react-native";
import { styles } from "./styles";
import { formatTime } from "../ClassesList/utils";

interface IUpcomingClassesCardProps {
  id: string;
  date: string;
  startTime: string;
  capacity: number;
  onClassPress: (classId: string) => void;
}

export function UpcomingClassesCard({
  id,
  capacity,
  date,
  startTime,
  onClassPress,
}: IUpcomingClassesCardProps) {
  const formattedDate = formatDistanceToNow(date, {
    locale: ptBR,
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => onClassPress(id)}>
      <View style={styles.content}>
        <View>
          <AppText size="sm">{formattedDate}</AppText>
          <AppText weight="semiBold" size="xl">
            {formatTime(startTime)}
          </AppText>
        </View>
        <View style={styles.capacity}>
          <Users2 size={14} />
          <AppText size="xs">{capacity}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
