import React from "react";
import { View } from "react-native";
import { styles as original } from "./styles";
import { SkeletonBox } from "../SkeletonBox";

type OptionsSelectorSkeletonProps = {
  optionsCount?: number;
  isRow?: boolean;
  fullWidth?: boolean;
};

export function OptionsSelectorSkeleton({
  optionsCount = 2,
  isRow = false,
  fullWidth = false,
}: OptionsSelectorSkeletonProps) {
  return (
    <View style={[original.container, isRow ? { flexDirection: "row" } : {}]}>
      {Array.from({ length: optionsCount }).map((_, idx) => (
        <View key={idx} style={[original.option, fullWidth ? { flex: 1 } : {}]}>
          {/* “ícone” circular */}
          <SkeletonBox
            width={28}
            height={28}
            borderRadius={999}
            style={{ marginRight: 12 }}
          />

          {/* textos */}
          <View style={{ flex: 1 }}>
            <SkeletonBox width={"60%"} height={12} borderRadius={6} />
            <SkeletonBox
              width={"40%"}
              height={10}
              borderRadius={6}
              style={{ marginTop: 6 }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
