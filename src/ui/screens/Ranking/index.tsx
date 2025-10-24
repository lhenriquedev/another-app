import { FlashList } from "@shopify/flash-list";
import { Screen } from "@ui/components/Screen";
import { View } from "react-native";
import { RankingItem } from "./RankingItem";
import { RankingPodiumItem } from "./RankingPodiumItem";
import { styles } from "./styles";

export function Ranking() {
  return (
    <Screen hasScroll headerType="default">
      <View style={styles.rankingPodiumContainer}>
        <RankingPodiumItem position={2} name="Lucas" totalCheckins={200} />
        <RankingPodiumItem position={1} name="Tas" totalCheckins={220} />
        <RankingPodiumItem position={3} name="Cassio" totalCheckins={170} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <FlashList
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          data={[
            {
              position: 4,
              name: "Henrique",
              totalCheckins: 20,
            },
            {
              position: 5,
              name: "Gerson",
              totalCheckins: 20,
            },
            {
              position: 6,
              name: "Camila",
              totalCheckins: 20,
            },
          ]}
          renderItem={({ item }) => <RankingItem {...item} />}
        />
      </View>
    </Screen>
  );
}
