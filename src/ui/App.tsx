import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";

import { Welcome } from "./screens/Welcome";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function App() {
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!isFontsLoaded) return null;

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Welcome />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
