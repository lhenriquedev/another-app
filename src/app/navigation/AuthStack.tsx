import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Welcome } from '@ui/screens/Welcome';

type AuthStackParamList = {
  Welcome: undefined
};

export type AuthStackNavigationsProps = NativeStackNavigationProp<AuthStackParamList>;

export type AuthStackScreenProps<
  TRouteName extends keyof AuthStackParamList,
> = NativeStackScreenProps<AuthStackParamList, TRouteName>;

export type AuthStackRouteProps<
  TRouteName extends keyof AuthStackParamList,
> = RouteProp<AuthStackParamList, TRouteName>

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Welcome' component={Welcome} />
    </Stack.Navigator>
  )
}
