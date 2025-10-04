import { View } from "react-native";
import { styles } from "./styles";
import { HomeHeader } from "./HomeHeader";
import { ClassesList } from "@ui/components/ClassesList";

export function Home() {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ClassesList />
    </View>
  )
}
