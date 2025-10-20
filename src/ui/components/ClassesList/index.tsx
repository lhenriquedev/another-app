import React from "react";
import { ScrollView } from "react-native";

import { styles } from "./styles";

export function ClassList({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {children}
      </ScrollView>
    </>
  );
}
