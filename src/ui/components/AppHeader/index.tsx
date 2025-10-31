import {
  AppStackNavigationsProps,
  AppStackParamList,
  routeTitles,
} from "@app/navigation/AppStack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "@ui/styles/theme";
import { ChevronLeftIcon } from "lucide-react-native";
import { View } from "react-native";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { styles } from "./styles";

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
    <View style={styles.container}>
      <Button variant="ghost" size="icon" onPress={handleBack}>
        <ChevronLeftIcon size={32} color={theme.colors.text} />
      </Button>

      <AppText size="lg" color={theme.colors.text} weight="semiBold">
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
