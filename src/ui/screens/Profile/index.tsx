import { useAuth } from "@app/contexts/AuthContext";
import { ProfileStackParamList } from "@app/navigation/ProfileStack";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuList } from "@ui/components/MenuList";
import { MenuListItem } from "@ui/components/MenuList/MenuListItem";
import { Screen } from "@ui/components/Screen";
import { ISignInBottomSheet } from "@ui/components/SignInBottomSheet/ISignInBottomSheet";
import { Edit, LogOut, Settings as SettingsIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { View } from "react-native";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileGeneral } from "./ProfileGeneral";
import { ProfileImageBottomSheet } from "./ProfileImageBottomSheet";
import { ProfileTab } from "./ProfileTab";
import { styles } from "./styles";

export type SelectedTab = "general" | "info";

type ProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileMain"
>;

export function Profile() {
  const { signOut } = useAuth();
  const navigation = useNavigation<ProfileNavigationProp>();
  const profileBottomSheetRef = useRef<ISignInBottomSheet>(null);
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("general");

  function handleOpenProfileAvatar() {
    profileBottomSheetRef.current?.open();
  }

  function handleNavigateToEditProfile() {
    navigation.navigate("EditProfile");
  }

  function handleNavigateToSettings() {
    navigation.navigate("Settings");
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <Screen headerType="default" style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <ProfileAvatar onOpenProfileBottomSheet={handleOpenProfileAvatar} />
        </View>

        <ProfileTab selectedTab={selectedTab} onSelectedTab={setSelectedTab} />

        <View style={{ flex: 1 }}>
          {selectedTab === "general" && <ProfileGeneral />}

          {selectedTab === "info" && (
            <View style={{ paddingTop: 24 }}>
              <MenuList>
                <MenuListItem
                  icon={Edit}
                  label="Editar Perfil"
                  onPress={handleNavigateToEditProfile}
                />
                <MenuListItem
                  icon={SettingsIcon}
                  label="Configurações"
                  onPress={handleNavigateToSettings}
                />
                <MenuListItem
                  icon={LogOut}
                  label="Sair"
                  onPress={handleSignOut}
                  variant="danger"
                />
              </MenuList>
            </View>
          )}
        </View>
      </View>

      <ProfileImageBottomSheet ref={profileBottomSheetRef} />
    </Screen>
  );
}
