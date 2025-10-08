import { AppText } from "../AppText";
import { Button } from "../Button";
import { IClassListBottomSheet } from "./IClassListBottomSheet";
import { Image, View } from "react-native";
import { styles } from "./styles";
import { theme } from "@ui/styles/theme";
import { useCallback, useImperativeHandle, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface IClassListBottomSheetProps {
  ref: React.Ref<IClassListBottomSheet>;
}

export function ClassListBottomSheet({ ref }: IClassListBottomSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    []
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        // Estas são as props opcionais que você pode customizar:
        disappearsOnIndex={-1} // Em qual índice o backdrop desaparece (-1 = quando fecha)
        appearsOnIndex={0} // Em qual índice o backdrop aparece (0 = primeiro snap point)
        opacity={0.5} // Opacidade do backdrop (0 a 1)
        pressBehavior="close" // O que acontece ao tocar: "close", "collapse" ou "none"
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView
          style={[styles.bottomSheetContainer, { paddingBottom: bottom }]}
        >
          <View style={{ gap: 32 }}>
            <View style={{ flex: 1, gap: 16 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.platinum.DEFAULT,
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Image
                    resizeMode="cover"
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                    source={{
                      uri: "https://imgs.search.brave.com/jC8B4LU0QvDONYhFVsmzM6bnCeg7EVSGV4Y7zqsPGcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/My8xMjU1MjMtMTI0/MngyMjA4LWlwaG9u/ZS1oZC1yaWNrLWFu/ZC1tb3J0eS1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
                    }}
                  />
                  <View>
                    <AppText weight="semiBold">Henrique</AppText>
                    <AppText size="sm">Faixa preta</AppText>
                  </View>
                </View>

                <View style={{ alignItems: "center", gap: 4 }}>
                  <View
                    style={{
                      backgroundColor: theme.colors.green[600],
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 10,
                    }}
                  >
                    <AppText
                      size="xs"
                      weight="semiBold"
                      color={theme.colors.green[900]}
                    >
                      Check-in
                    </AppText>
                  </View>
                  <AppText size="xs" color={theme.colors.platinum[900]}>
                    19:30h - 20:30h
                  </AppText>
                </View>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.platinum.DEFAULT,
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Image
                    resizeMode="cover"
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                    source={{
                      uri: "https://imgs.search.brave.com/jC8B4LU0QvDONYhFVsmzM6bnCeg7EVSGV4Y7zqsPGcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/My8xMjU1MjMtMTI0/MngyMjA4LWlwaG9u/ZS1oZC1yaWNrLWFu/ZC1tb3J0eS1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
                    }}
                  />
                  <View>
                    <AppText weight="semiBold">Henrique</AppText>
                    <AppText size="sm">Faixa preta</AppText>
                  </View>
                </View>

                <View style={{ alignItems: "center", gap: 4 }}>
                  <View
                    style={{
                      backgroundColor: theme.colors.green[600],
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 10,
                    }}
                  >
                    <AppText
                      size="xs"
                      weight="semiBold"
                      color={theme.colors.green[900]}
                    >
                      Check-in
                    </AppText>
                  </View>
                  <AppText size="xs" color={theme.colors.platinum[900]}>
                    19:30h - 20:30h
                  </AppText>
                </View>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.platinum.DEFAULT,
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Image
                    resizeMode="cover"
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                    source={{
                      uri: "https://imgs.search.brave.com/jC8B4LU0QvDONYhFVsmzM6bnCeg7EVSGV4Y7zqsPGcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/My8xMjU1MjMtMTI0/MngyMjA4LWlwaG9u/ZS1oZC1yaWNrLWFu/ZC1tb3J0eS1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
                    }}
                  />
                  <View>
                    <AppText weight="semiBold">Henrique</AppText>
                    <AppText size="sm">Faixa preta</AppText>
                  </View>
                </View>

                <View style={{ alignItems: "center", gap: 4 }}>
                  <View
                    style={{
                      backgroundColor: theme.colors.green[600],
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 10,
                    }}
                  >
                    <AppText
                      size="xs"
                      weight="semiBold"
                      color={theme.colors.green[900]}
                    >
                      Check-in
                    </AppText>
                  </View>
                  <AppText size="xs" color={theme.colors.platinum[900]}>
                    19:30h - 20:30h
                  </AppText>
                </View>
              </View>
            </View>
            <Button>Check-in</Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
