import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider, useAuth } from "@app/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "@app/navigation/AppStack";
import { AuthStack } from "@app/navigation/AuthStack";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const RootLayout = () => {
  const { isLoggedIn, isLoading } = useAuth();

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    const isFontLoaded = loaded || error;
    const isUserLoaded = !isLoading;

    if (isFontLoaded && isUserLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, isLoading]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <BottomSheetModalProvider>
      <NavigationContainer>
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
};

export function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RootLayout />
            <Toaster richColors />
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
