import { AccountStep } from "@app/features/auth/components/AccountStep";
import { BeltStep } from "@app/features/auth/components/BeltStep";
import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigationIndependentTree,
  RouteProp,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type SignupStackParamList = {
  Account: undefined;
  Belt: undefined;
};

export type SignupStackNavigationsProps =
  NativeStackNavigationProp<SignupStackParamList>;

export type SignupStackScreenProps<
  TRouteName extends keyof SignupStackParamList
> = NativeStackScreenProps<SignupStackParamList, TRouteName>;

export type SignupStackRouteProps<
  TRouteName extends keyof SignupStackParamList
> = RouteProp<SignupStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<SignupStackParamList>();
export const signupNavigation =
  createNavigationContainerRef<SignupStackParamList>();

export function SignupStack() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={signupNavigation}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Account"
        >
          <Stack.Screen name="Account" component={AccountStep} />
          <Stack.Screen name="Belt" component={BeltStep} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
