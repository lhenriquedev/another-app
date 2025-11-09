import { Signup } from "@app/features/auth/screens/Signup";
import { Welcome } from "@app/features/auth/screens/Welcome";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Welcome: undefined;
  Signup: undefined;
};

export type AuthStackNavigationsProps =
  NativeStackNavigationProp<AuthStackParamList>;

export type AuthStackScreenProps<TRouteName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, TRouteName>;

export type AuthStackRouteProps<TRouteName extends keyof AuthStackParamList> =
  RouteProp<AuthStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
