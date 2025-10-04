import { View } from "react-native";
import { styles } from "./styles";
import { AppHeader } from "@ui/components/AppHeader";
import { Button } from "@ui/components/Button";
import { LogOut } from "lucide-react-native";

export function Profile() {
  return (
    <View style={styles.container}>
      <AppHeader
        rightAction={
          <Button variant="ghost" size="icon">
            <LogOut />
          </Button>
        }
      />
    </View>
  );
}
