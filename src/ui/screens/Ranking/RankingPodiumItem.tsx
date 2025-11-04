import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { Image, View } from "react-native";
import { styles } from "./styles";

type RankingPodiumItemProps = {
  position: number;
  name: string;
  totalCheckins: number;
  avatar: string;
};

export function RankingPodiumItem({
  position,
  name,
  totalCheckins,
  avatar,
}: RankingPodiumItemProps) {
  const isFirstPosition = position === 1;
  const isSecondPosition = position === 2;
  const isThirdPosition = position === 3;

  return (
    <View
      style={[
        styles.rankingPodiumContent,
        isFirstPosition && { paddingBottom: 80 },
      ]}
    >
      <View
        style={[
          styles.rankingPodiumPosition,
          isFirstPosition && { backgroundColor: theme.colors.primary },
          isSecondPosition && { backgroundColor: theme.colors.mutedText },
          isThirdPosition && { backgroundColor: theme.colors.accent },
        ]}
      >
        <AppText size="xs" color={theme.colors.background}>
          {position}
        </AppText>
      </View>
      <Image
        style={[
          styles.rankingPodiumImage,
          isFirstPosition && { borderColor: theme.colors.primary },
          isSecondPosition && { borderColor: theme.colors.mutedText },
          isThirdPosition && { borderColor: theme.colors.accent },
        ]}
        resizeMode="cover"
        source={{ uri: avatar }}
      />
      <AppText size="sm">
        {name.length > 10 ? `${name.substring(0, 10)}...` : name}
      </AppText>
      <AppText size="md" weight="semiBold">
        {totalCheckins}
      </AppText>
    </View>
  );
}
