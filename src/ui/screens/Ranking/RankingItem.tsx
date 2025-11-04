import { Ranking } from "@app/hooks/useRanking";
import { AppText } from "@ui/components/AppText";
import { Image, View } from "react-native";
import { styles } from "./styles";

export function RankingItem({
  position,
  // userId,
  userName,
  totalCheckins,
  avatar,
}: Ranking) {
  return (
    <View style={styles.rankingItemContainer}>
      <View style={styles.rankingItemContent}>
        <AppText weight="semiBold" size="xs">
          {position}
        </AppText>
        <Image style={styles.rankingItemImage} source={{ uri: avatar }} />
        <AppText weight="medium">{userName}</AppText>
      </View>

      <AppText weight="semiBold">{totalCheckins}</AppText>
    </View>
  );
}
