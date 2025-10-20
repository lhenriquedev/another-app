import { AppText } from "@ui/components/AppText";
import {
  Animated,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
} from "react-native";
import { styles } from "./styles";
import { SelectedTab } from ".";
import { theme } from "@ui/styles/theme";
import { useEffect, useRef, useState } from "react";

interface ProfileTabProps {
  selectedTab: SelectedTab;
  onSelectedTab: (selectedTab: SelectedTab) => void;
}

export function ProfileTab({ selectedTab, onSelectedTab }: ProfileTabProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [tabLayouts, setTabLayouts] = useState<{
    general: number;
    info: number;
  }>({
    general: 0,
    info: 0,
  });
  const [tabPositions, setTabPositions] = useState<{
    general: number;
    info: number;
  }>({
    general: 0,
    info: 0,
  });

  // anima a linha conforme a aba selecionada
  useEffect(() => {
    const toValue =
      selectedTab === "general" ? tabPositions.general : tabPositions.info;

    Animated.timing(translateX, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [selectedTab, tabPositions]);

  const handleLayout = (tab: "general" | "info") => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setTabLayouts((prev) => ({ ...prev, [tab]: width }));
    setTabPositions((prev) => ({ ...prev, [tab]: x }));
  };

  const activeWidth =
    selectedTab === "general" ? tabLayouts.general : tabLayouts.info;

  return (
    <View style={styles.profileTabContainer}>
      <TouchableOpacity
        onLayout={handleLayout("general")}
        style={[styles.profileTabButton, { borderTopLeftRadius: 10 }]}
        onPress={() => onSelectedTab("general")}
      >
        <AppText
          style={{
            color:
              selectedTab === "general"
                ? theme.colors.black[800]
                : theme.colors.platinum[700],
          }}
        >
          Geral
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        onLayout={handleLayout("info")}
        style={[styles.profileTabButton, { borderTopRightRadius: 10 }]}
        onPress={() => onSelectedTab("info")}
      >
        <AppText
          style={{
            color:
              selectedTab === "info"
                ? theme.colors.black[800]
                : theme.colors.platinum[700],
          }}
        >
          Informações
        </AppText>
      </TouchableOpacity>

      {/* Linha animada */}
      {activeWidth > 0 && (
        <Animated.View
          style={[
            styles.animatedBorder,
            {
              width: activeWidth,
              transform: [{ translateX }],
            },
          ]}
        />
      )}
    </View>
  );
}
