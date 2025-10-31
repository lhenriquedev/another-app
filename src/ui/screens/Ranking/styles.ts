import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  rankingContainer: {},
  rankingPodiumContainer: {
    marginTop: 16,
    // paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  rankingPodiumContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  rankingPodiumImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    position: "relative",
    borderWidth: 6,
  },
  rankingPodiumPosition: {
    position: "absolute",
    top: -6,
    right: 0,
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.card,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  rankingItemContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  rankingItemContent: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  rankingItemImage: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
});
