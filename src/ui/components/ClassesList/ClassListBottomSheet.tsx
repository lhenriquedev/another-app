import { AppText } from "../AppText";
import { Button } from "../Button";
import { IClassListBottomSheet } from "./IClassListBottomSheet";
import { View } from "react-native";
import { styles } from "./styles";
import { useCallback, useImperativeHandle, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ClassListBottomSheetCard } from "./ClassListBottomSheetCard";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@app/services/httpClient";
import { IClassDetails } from "./class.types";
import { formatTime } from "./utils";
import { BELTS, BeltType } from "@ui/screens/Profile/ProfileGeneral";

interface IClassListBottomSheetProps {
  ref: React.Ref<IClassListBottomSheet>;
}

export function ClassListBottomSheet({ ref }: IClassListBottomSheetProps) {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const { data: classDetails, isLoading } = useQuery({
    queryKey: ["classe-by-id", selectedClassId],
    queryFn: async () => {
      const { data } = await httpClient.get<IClassDetails>(
        `/classes/${selectedClassId}`
      );
      return data;
    },
    enabled: !!selectedClassId,
  });

  useImperativeHandle(
    ref,
    () => ({
      open: (classId: string) => {
        setSelectedClassId(classId);
        bottomSheetModalRef.current?.present();
      },
    }),
    []
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  if (!classDetails) return null;

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView
          style={[styles.bottomSheetContainer, { paddingBottom: bottom }]}
        >
          {!isLoading && (
            <View style={{ gap: 16 }}>
              <View>
                <AppText weight="semiBold" size="xl">
                  {classDetails?.category.type}
                </AppText>
                <AppText size="sm">
                  {classDetails?.instructor.name} -{" "}
                  {BELTS[classDetails?.instructor.belt as BeltType]}
                </AppText>
              </View>

              <FlashList
                data={classDetails?.students}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => (
                  <AppText>Nenhum aluno cadastrado!</AppText>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => (
                  <ClassListBottomSheetCard
                    avatarUrl="https://imgs.search.brave.com/sYS3AaZj_MVIbF5CaDMKshfK2uVKaByHEboqLMlk1Fw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNvbGxpZGVy/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjUvMDMv/cmljay1tb3J0eS1w/b3J0YWwuanBnP3E9/NDkmZml0PWNyb3Am/dz0zNjAmaD0yNDAm/ZHByPTI"
                    belt={item.belt}
                    checkedAt={formatTime(item.checkin?.completedAt ?? "")}
                    // resolver esse b.o
                    checkinStatus={item.checkin!.status}
                  />
                )}
              />

              <Button>Check-in</Button>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
