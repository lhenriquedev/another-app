import { AppText } from "../AppText";
import { ClassesListDatePicker } from "./ClassesListPicker";
import { ClassesListItems } from "./ClassesListItems";
import { ClassListBottomSheet } from "./ClassListBottomSheet";
import { IClassListBottomSheet } from "./IClassListBottomSheet";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";
import { useRef } from "react";
import { View } from "react-native";

export function ClassesList() {
  const classListBottomSheetRef = useRef<IClassListBottomSheet>(null);

  return (
    <>
      <View style={styles.container}>
        <ClassesListDatePicker />

        <View
          style={{
            paddingHorizontal: 16,
            borderTopWidth: 1,
            borderTopColor: theme.colors.platinum.DEFAULT,
            gap: 8,
            marginBottom: 32,
          }}
        >
          <AppText
            weight="medium"
            style={{
              textTransform: "uppercase",
              marginTop: 20,
            }}
          >
            Aulas disponíveis
          </AppText>
          <AppText color={theme.colors.platinum[900]}>
            Aulas disponíveis para hoje
          </AppText>
        </View>

        <View style={{ gap: 16 }}>
          <ClassesListItems
            onOpen={() => classListBottomSheetRef.current?.open()}
          />
          <ClassesListItems
            onOpen={() => classListBottomSheetRef.current?.open()}
          />
          <ClassesListItems
            onOpen={() => classListBottomSheetRef.current?.open()}
          />
          <ClassesListItems
            onOpen={() => classListBottomSheetRef.current?.open()}
          />
        </View>
      </View>

      <ClassListBottomSheet ref={classListBottomSheetRef} />
    </>
  );
}
