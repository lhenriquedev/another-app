import { FlashList } from "@shopify/flash-list";
import { AppHeader } from "@ui/components/AppHeader";
import { View } from "react-native";
import { RankingItem } from "./RankingItem";
import { RankingPodiumItem } from "./RankingPodiumItem";
import { styles } from "./styles";

export function Ranking() {
  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.rankingPodiumContainer}>
        <RankingPodiumItem position={2} name="Lucas" totalCheckins={200} />
        <RankingPodiumItem position={1} name="Tas" totalCheckins={220} />
        <RankingPodiumItem position={3} name="Cassio" totalCheckins={170} />
      </View>

      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <FlashList
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
    </View>
  );
}
