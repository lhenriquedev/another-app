import { AppText } from "../AppText";
import { Pressable, View } from "react-native";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";
import { Users } from "lucide-react-native";

interface IClassesListCardProps {
  onOpen: () => void;
}

export function ClassesListCard({ onOpen }: IClassesListCardProps) {
  return (
    <Pressable style={styles.classListCard} onPress={onOpen}>
      <View style={styles.classListCardHeader}>
        <View>
          <AppText weight="semiBold">Henrique</AppText>
          <AppText size="sm">Competição</AppText>
        </View>
        <View style={{ alignItems: "center", gap: 4 }}>
          <View
            style={{
              backgroundColor: theme.colors.green[600],
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 10,
            }}
          >
            <AppText
              size="xs"
              weight="semiBold"
              color={theme.colors.green[900]}
            >
              Status da aula
            </AppText>
          </View>
          <AppText size="xs" color={theme.colors.platinum[900]}>
            19:30h - 20:30h
          </AppText>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Users size={16} />
        <AppText size="sm">7/10</AppText>
      </View>
    </Pressable>
  );
}
