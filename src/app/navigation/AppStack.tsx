import { RouteProp } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { Home } from "@ui/screens/Home";
import { Profile } from "@ui/screens/Profile";
import { House, User } from "lucide-react-native";

type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type AppStackNavigationsProps =
  BottomTabNavigationProp<AppStackParamList>;

export type AppStackScreenProps<TRouteName extends keyof AppStackParamList> =
  BottomTabScreenProps<AppStackParamList, TRouteName>;

export type AppStackRouteProps<TRouteName extends keyof AppStackParamList> =
  RouteProp<AppStackParamList, TRouteName>;

const BottomTab = createBottomTabNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <House size={32} />,
          tabBarShowLabel: false
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <User size={32} />,
          tabBarShowLabel: false,
        }}
      />
    </BottomTab.Navigator>
  );
}
