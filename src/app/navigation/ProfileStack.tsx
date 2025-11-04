import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EditProfile } from "@ui/screens/EditProfile";
import { Profile } from "@ui/screens/Profile";
import { Settings } from "@ui/screens/Settings";
import { theme } from "@ui/styles/theme";

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerShadowVisible: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="ProfileMain"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: "Editar Perfil",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Configurações",
        }}
      />
    </Stack.Navigator>
  );
}
