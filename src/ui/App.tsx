import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@app/contexts/AuthContext";
import { Navigation } from "@app/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner-native";

const queryClient = new QueryClient();

export function App() {
  const [isFontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!isFontLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Navigation />
              <Toaster richColors />
            </AuthProvider>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
