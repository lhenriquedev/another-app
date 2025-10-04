import { View } from "react-native";
import { theme } from "@ui/styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Button } from "../Button";
import { ChevronLeftIcon } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  AppStackNavigationsProps,
  AppStackParamList,
  routeTitles,
} from "@app/navigation/AppStack";
import { AppText } from "../AppText";

interface IAppHeaderProps {
  rightAction?: React.ReactNode;
}

export function AppHeader({ rightAction }: IAppHeaderProps) {
  const { top } = useSafeAreaInsets();

  const navigation = useNavigation<AppStackNavigationsProps>();
  const route = useRoute<RouteProp<AppStackParamList>>();
  const title = routeTitles[route.name];

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  }

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Button variant="ghost" size="icon" onPress={handleBack}>
        <ChevronLeftIcon size={32} color={theme.colors.black[700]} />
      </Button>

      <AppText color={theme.colors.black[700]} weight="medium">
        {title}
      </AppText>

      {rightAction ? (
        <View>{rightAction}</View>
      ) : (
        <View style={{ width: 48 }} />
      )}
    </View>
  );
}
