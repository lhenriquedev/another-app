import { theme } from "@ui/styles/theme";
import { Image, StyleSheet, View } from "react-native";
import { AppText } from "../AppText";
import { Ban, Check } from "lucide-react-native";
import { BELTS, BeltType } from "@ui/screens/Profile/ProfileGeneral";

interface IClassListBottomSheetCardProps {
  avatarUrl: string;
  belt: string;
  checkinStatus: "done" | "cancelled";
  checkedAt: string;
}

export function ClassListBottomSheetCard({
  avatarUrl,
  belt,
  checkedAt,
  checkinStatus,
}: IClassListBottomSheetCardProps) {
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{
              uri: avatarUrl,
            }}
          />
          <View>
            <AppText weight="semiBold">Henrique</AppText>
            <AppText color={theme.colors.platinum[800]} size="xs">
              {BELTS[belt as BeltType]}
            </AppText>
          </View>
        </View>

        <View style={{ alignItems: "center", gap: 4 }}>
          <View
            style={[
              styles.badge,
              checkinStatus === "done"
                ? { backgroundColor: theme.colors.green[600] }
                : { backgroundColor: theme.colors.support.red },
            ]}
          >
            {checkinStatus === "done" ? (
              <Check size={14} color={theme.colors.white[400]} />
            ) : (
              <Ban size={14} color={theme.colors.white[400]} />
            )}
          </View>
          <AppText size="xs" color={theme.colors.platinum[900]}>
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
    borderColor: theme.colors.platinum.DEFAULT,
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
