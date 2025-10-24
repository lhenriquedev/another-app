import { Ranking } from "@app/hooks/useRanking";
import { AppText } from "@ui/components/AppText";
import { Image, View } from "react-native";
import { styles } from "./styles";

export function RankingItem({
  position,
  // userId,
  userName,
  totalCheckins,
}: Ranking) {
  return (
    <View style={styles.rankingItemContainer}>
      <View style={styles.rankingItemContent}>
        <AppText weight="semiBold" size="xs">
          {position}
        </AppText>
        <Image
          style={styles.rankingItemImage}
          source={{
            uri: "https://imgs.search.brave.com/jC8B4LU0QvDONYhFVsmzM6bnCeg7EVSGV4Y7zqsPGcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/My8xMjU1MjMtMTI0/MngyMjA4LWlwaG9u/ZS1oZC1yaWNrLWFu/ZC1tb3J0eS1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
          }}
        />
        <AppText weight="medium">{userName}</AppText>
      </View>

      <AppText weight="semiBold">{totalCheckins}</AppText>
    </View>
  );
}
