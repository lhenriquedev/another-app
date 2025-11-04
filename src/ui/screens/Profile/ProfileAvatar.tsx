import { useAuth } from "@app/contexts/AuthContext";
import { BELTS, BeltType } from "@app/hooks/useBelts";
import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface IProfileAvatarProps {
  onOpenProfileBottomSheet: () => void;
}

export function ProfileAvatar({
  onOpenProfileBottomSheet,
}: IProfileAvatarProps) {
  const { user } = useAuth();

  const avatarUri = user?.avatar
    ? user.avatarUpdatedAt
      ? `${user.avatar}?t=${new Date(user.avatarUpdatedAt).getTime()}`
      : user.avatar
    : undefined;

  return (
    <View style={styles.profileAvatarContainer}>
      <TouchableOpacity
        style={styles.profileAvatarButton}
        onPress={onOpenProfileBottomSheet}
      >
        <Image
          style={styles.profileAvatar}
          resizeMode="cover"
          source={{
            uri: avatarUri,
          }}
        />
      </TouchableOpacity>

      <View>
        <AppText color={theme.colors.text} weight="semiBold">
          {user?.name}
        </AppText>
        <AppText size="xs" color={theme.colors.mutedText}>
          Faixa {BELTS[user?.belt as BeltType]}
        </AppText>
      </View>
    </View>
  );
}
