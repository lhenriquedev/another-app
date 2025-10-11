import { View } from "react-native";
import { theme } from "@ui/styles/theme";
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
import { SafeAreaView } from "react-native-safe-area-context";

interface IAppHeaderProps {
  rightAction?: React.ReactNode;
}

export function AppHeader({ rightAction }: IAppHeaderProps) {
  const navigation = useNavigation<AppStackNavigationsProps>();
  const route = useRoute<RouteProp<AppStackParamList>>();
  const title = routeTitles[route.name];

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Profile");
    }
  }

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <Button variant="ghost" size="icon" onPress={handleBack}>
          <ChevronLeftIcon size={32} color={theme.colors.black[700]} />
        </Button>

        <AppText size="lg" color={theme.colors.black[500]} weight="semiBold">
          {title}
        </AppText>

        {rightAction ? (
          <View>{rightAction}</View>
        ) : (
          <View style={{ width: 48 }} />
        )}
      </View>
    </SafeAreaView>
  );
}
