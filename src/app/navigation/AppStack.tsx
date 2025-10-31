import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { CalendarScreen } from "@ui/screens/Calendar";
import { Home } from "@ui/screens/Home";
import { Profile } from "@ui/screens/Profile";
import { Ranking } from "@ui/screens/Ranking";
import { theme } from "@ui/styles/theme";
import {
  Calendar,
  ChartNoAxesColumn,
  HomeIcon,
  User,
  LucideIcon,
} from "lucide-react-native";
import { View } from "react-native";

export const routeTitles = {
  Home: "Início",
  Profile: "Perfil",
  Calendar: "Calendário",
  Ranking: "Ranking",
} as const;

export type AppStackParamList = {
  Home: undefined;
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

function TabIcon({ Icon, focused }: { Icon: LucideIcon; focused: boolean }) {
  return (
    <View
      style={{
        borderTopWidth: 3,
        borderTopColor: focused ? theme.colors.primary : "transparent",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: 8,
      }}
    >
      <View style={{ marginBottom: 4 }}>
        <Icon
          size={24}
          color={focused ? theme.colors.primary : theme.colors.mutedText}
        />
      </View>
    </View>
  );
}

export function AppStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarStyle: {
          height: 90,
          backgroundColor: theme.colors.card,
          borderTopWidth: 0,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={HomeIcon} focused={focused} />
          ),
          tabBarLabel: "Início",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.mutedText,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={Calendar} focused={focused} />
          ),
          tabBarLabel: "Calendário",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.mutedText,
        }}
      />
      <BottomTab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={ChartNoAxesColumn} focused={focused} />
          ),
          tabBarLabel: "Ranking",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.mutedText,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={User} focused={focused} />
          ),
          tabBarLabel: "Perfil",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.mutedText,
        }}
      />
    </BottomTab.Navigator>
  );
}
