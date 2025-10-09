import { View } from "react-native";
import { styles } from "./styles";
import { AppHeader } from "@ui/components/AppHeader";
import { Button } from "@ui/components/Button";
import { LogOut } from "lucide-react-native";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileTab } from "./ProfileTab";
import { useState } from "react";
import { ProfileGeneral } from "./ProfileGeneral";
import { useAuth } from "@app/contexts/AuthContext";

export type SelectedTab = "general" | "info";

export function Profile() {
  const { signOut } = useAuth();
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("general");

  function handleSelectedTab(selectedTab: SelectedTab) {
    setSelectedTab(selectedTab);
  }

  return (
    <View style={styles.container}>
      <AppHeader
        rightAction={
          <Button variant="ghost" size="icon" onPress={signOut}>
            <LogOut />
          </Button>
        }
      />

      <View style={styles.profileContent}>
        <ProfileAvatar />

        <ProfileTab
          onSelectedTab={handleSelectedTab}
          selectedTab={selectedTab}
        />

        {selectedTab === "general" && <ProfileGeneral />}
        {selectedTab === "info" && <ProfileInfo />}
      </View>
    </View>
  );
}
