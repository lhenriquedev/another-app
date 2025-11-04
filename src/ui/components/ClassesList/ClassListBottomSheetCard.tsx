import { theme } from "@ui/styles/theme";
import { Image, StyleSheet, View } from "react-native";
import { AppText } from "../AppText";
import { Ban, Check } from "lucide-react-native";
import { BELTS, BeltType } from "@app/hooks/useBelts";

interface IClassListBottomSheetCardProps {
  avatarUrl?: string;
  belt: string;
  checkinStatus: "done" | "cancelled";
  checkedAt: string;
  name: string;
  isCurrentUserInClass: boolean;
}

export function ClassListBottomSheetCard({
  avatarUrl,
  belt,
  checkedAt,
  checkinStatus,
  name,
  isCurrentUserInClass,
}: IClassListBottomSheetCardProps) {
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <View
        style={[
          styles.container,
          isCurrentUserInClass
            ? {
                backgroundColor: "rgba(245, 200, 66, 0.1)",
                borderColor: theme.colors.primary,
              }
            : {},
        ]}
      >
        <View style={styles.content}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: avatarUrl }}
          />
          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <AppText weight="semiBold">{name}</AppText>
              {isCurrentUserInClass && (
                <View
                  style={{
                    backgroundColor: theme.colors.primary,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 4,
                  }}
                >
                  <AppText
                    size="xs"
                    weight="semiBold"
                    color={theme.colors.background}
                  >
                    Você
                  </AppText>
                </View>
              )}
            </View>
            <AppText color={theme.colors.mutedText} size="xs">
              {BELTS[belt as BeltType]}
            </AppText>
          </View>
        </View>

        <View style={{ alignItems: "center", gap: 4 }}>
          <View
            style={[
              styles.badge,
              checkinStatus === "done"
                ? { backgroundColor: theme.colors.success }
                : { backgroundColor: theme.colors.accent },
            ]}
          >
            {checkinStatus === "done" ? (
              <Check size={14} color={theme.colors.text} />
            ) : (
              <Ban size={14} color={theme.colors.text} />
            )}
          </View>
          <AppText size="xs" color={theme.colors.mutedText}>
            {checkedAt}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  badge: {
    padding: 4,
    borderRadius: 100,
  },
});
