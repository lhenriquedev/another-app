import { theme } from "@ui/styles/theme";
import { KeyboardAvoidingView, Platform, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "../AppHeader";
import { HomeHeader } from "../HomeHeader";
import { ScrollViewContainer, ViewContainer } from "./ScreenContainer";

type HeaderType = "default" | "home";

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  headerType: HeaderType;
  hasScroll: boolean;
}

export function Screen({
  children,
  headerType = "default",
  hasScroll = false,
  style,
  ...screenProps
}: ScreenProps) {
  const { bottom, top } = useSafeAreaInsets();
  const Container = hasScroll ? ScrollViewContainer : ViewContainer;

  const renderHeaderType = () => {
    if (headerType === "default") {
      return <AppHeader />;
    }

    if (headerType === "home") {
      return <HomeHeader />;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container backgroundColor={theme.colors.white[400]}>
        <View
          style={[{ paddingTop: top, paddingBottom: bottom }, style]}
          {...screenProps}
        >
          {renderHeaderType()}
          {children}
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
