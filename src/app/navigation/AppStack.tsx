import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { CalendarScreen } from "@ui/screens/Calendar";
import { Profile } from "@ui/screens/Profile";
import { Ranking } from "@ui/screens/Ranking";
import { theme } from "@ui/styles/theme";
import { Calendar, ChartNoAxesColumn, User } from "lucide-react-native";

export const routeTitles = {
  // Home: "Início",
  Profile: "Perfil",
  Calendar: "Calendário",
  Ranking: "Ranking",
} as const;

export type AppStackParamList = {
  // Home: undefined;
  Profile: undefined;
  Calendar: undefined;
  Ranking: undefined;
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
        animation: "shift",
        tabBarStyle: {
          height: 90,
          // paddingTop: 8,
          backgroundColor: theme.colors.white[400],
        },
      }}
    >
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarActiveBackgroundColor: theme.colors.white[700],
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
        name="Ranking"
        component={Ranking}
        options={{
          tabBarActiveBackgroundColor: theme.colors.white[700],
          tabBarIcon: ({ focused }) => (
            <ChartNoAxesColumn
              size={24}
              color={
                focused ? theme.colors.black[700] : theme.colors.platinum[900]
              }
            />
          ),
          tabBarLabel: "Ranking",
          tabBarActiveTintColor: theme.colors.black[800],
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarActiveBackgroundColor: theme.colors.white[700],
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
