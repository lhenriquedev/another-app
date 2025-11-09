import { Button } from "@ui/components/Button";
import { theme } from "@ui/styles/theme";
import { ChevronLeftIcon } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSignup } from "../../contexts/useSignup";
import { TOTAL_STEPS } from "../../utils/steps";
import { styles } from "./styles";

export function SignupHeader() {
  const { top } = useSafeAreaInsets();
  const { previousStep, currentStepIndex } = useSignup();

  const widthAnimationRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnimationRef.current, {
      toValue: ((currentStepIndex + 1) * 100) / TOTAL_STEPS,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStepIndex]);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Button variant="icon" size="icon" onPress={previousStep}>
        <ChevronLeftIcon size={28} color={theme.colors.text} />
      </Button>

      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarForeground,
            {
              width: widthAnimationRef.current.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.rightActionPlaceholder} />
    </View>
  );
}
