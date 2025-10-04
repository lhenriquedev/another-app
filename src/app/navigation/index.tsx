import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./AuthStack";
import { useAuth } from "@app/contexts/AuthContext";
import { AppStack } from "./AppStack";

export function Navigation() {
  const { isLoggedIn } = useAuth()


  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
