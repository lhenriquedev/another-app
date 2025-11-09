import { useAuth } from "@app/contexts/AuthContext";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

export type RootStackParamList = {
  App: undefined;
  Auth: undefined;
};

export type RootStackNavigationsProps =
  NativeStackNavigationProp<RootStackParamList>;

export type RootStackScreenProps<TRouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, TRouteName>;

export type RootStackRouteProps<TRouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn && (
        <Stack.Screen
          name="App"
          component={AppStack}
          options={{
            animationTypeForReplace: "push",
          }}
        />
      )}

      {!isLoggedIn && (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            animationTypeForReplace: "pop",
          }}
        />
      )}
    </Stack.Navigator>
  );
}
