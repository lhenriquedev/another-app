import { RouteProp } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { Profile } from "@ui/screens/Profile";
import { Calendar, User } from "lucide-react-native";
import { theme } from "@ui/styles/theme";
import { CalendarScreen } from "@ui/screens/Calendar";

export const routeTitles = {
  // Home: "Início",
  Profile: "Perfil",
  Calendar: "Calendário",
} as const;

export type AppStackParamList = {
  // Home: undefined;
  Profile: undefined;
  Calendar: undefined;
};

export type RouteNames = keyof typeof routeTitles;

export type AppStackNavigationsProps =
  BottomTabNavigationProp<AppStackParamList>;

export type AppStackScreenProps<TRouteName extends keyof AppStackParamList> =
  BottomTabScreenProps<AppStackParamList, TRouteName>;

export type AppStackRouteProps<TRouteName extends keyof AppStackParamList> =
  RouteProp<AppStackParamList, TRouteName>;

const BottomTab = createBottomTabNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 8,
          backgroundColor: theme.colors.white[400],
        },
      }}
    >
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Calendar
              size={24}
              color={
                focused ? theme.colors.black[700] : theme.colors.platinum[900]
              }
            />
          ),
          tabBarLabel: "Calendário",
          tabBarActiveTintColor: theme.colors.black[800],
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <User
              size={24}
              color={
                focused ? theme.colors.black[700] : theme.colors.platinum[900]
              }
            />
          ),
          tabBarLabel: "Perfil",
          tabBarActiveTintColor: theme.colors.black[800],
        }}
      />
    </BottomTab.Navigator>
  );
}
