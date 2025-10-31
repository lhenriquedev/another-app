import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { Image, View } from "react-native";
import { styles } from "./styles";

type RankingPodiumItemProps = {
  position: number;
  name: string;
  totalCheckins: number;
};

export function RankingPodiumItem({
  position,
  name,
  totalCheckins,
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
        source={{
          uri: "https://imgs.search.brave.com/jC8B4LU0QvDONYhFVsmzM6bnCeg7EVSGV4Y7zqsPGcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/My8xMjU1MjMtMTI0/MngyMjA4LWlwaG9u/ZS1oZC1yaWNrLWFu/ZC1tb3J0eS1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
        }}
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
