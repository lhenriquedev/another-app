import { AppText } from "../AppText";
import { Button } from "../Button";
import { IClassListBottomSheet } from "./IClassListBottomSheet";
import { Alert, View } from "react-native";
import { styles } from "./styles";
import { useCallback, useImperativeHandle, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ClassListBottomSheetCard } from "./ClassListBottomSheetCard";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpClient } from "@app/services/httpClient";
import { IClassDetails } from "./class.types";
import { formatTime } from "./utils";
import { EmptyState } from "../EmptyState";
import { Target } from "lucide-react-native";
import { ClassDetailsSkeleton } from "./ClassDetailsSkeleton";
import { BELTS, BeltType } from "@app/hooks/useBelts";
import { isAxiosError } from "axios";
import { useAuth } from "@app/contexts/AuthContext";

interface IClassListBottomSheetProps {
  ref: React.Ref<IClassListBottomSheet>;
  selectedClassId: string | null;
  onSelectedClass: (classId: string) => void;
}

export function ClassListBottomSheet({
  ref,
  selectedClassId,
}: IClassListBottomSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const { user } = useAuth();

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
      open: () => {
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

  const { mutateAsync: createCheckin, isPending: isCreatingCheckin } =
    useMutation({
      mutationFn: async () => {
        const { data } = await httpClient.post(`/create-checkin`, {
          classId: selectedClassId,
        });

        return data;
      },
      onSuccess(data, variables, onMutateResult, context) {
        context.client.invalidateQueries({ queryKey: ["classe-by-id"] });
      },
    });

  const { mutateAsync: cancelCheckin, isPending: isCancellingCheckin } =
    useMutation({
      mutationFn: async () => {
        const { data } = await httpClient.patch(`/cancel-checkin`, {
          classId: selectedClassId,
        });

        return data;
      },
      onSuccess(data, variables, onMutateResult, context) {
        context.client.invalidateQueries({
          queryKey: ["classe-by-id"],
        });
        context.client.invalidateQueries({
          queryKey: ["user"],
        });
      },
    });

  const handleCheckin = async () => {
    try {
      await createCheckin();
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
    }
  };

  const handleCancelCheckin = async () => {
    try {
      await cancelCheckin();
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
    }
  };

  const currentUser = classDetails?.students.find(
    (_user) => _user.id === user?.id
  );

  const isCurrentUserInClass = !!currentUser;

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView
          style={[styles.bottomSheetContainer, { paddingBottom: bottom }]}
        >
          {isLoading && <ClassDetailsSkeleton count={3} />}
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
                ListEmptyComponent={
                  <EmptyState
                    title="Nenhum aluno fez check-in"
                    description="Seja o primeiro a entrar na aula"
                    icon={<Target />}
                  />
                }
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => (
                  <ClassListBottomSheetCard
                    avatarUrl="https://imgs.search.brave.com/sYS3AaZj_MVIbF5CaDMKshfK2uVKaByHEboqLMlk1Fw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNvbGxpZGVy/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjUvMDMv/cmljay1tb3J0eS1w/b3J0YWwuanBnP3E9/NDkmZml0PWNyb3Am/dz0zNjAmaD0yNDAm/ZHByPTI"
                    belt={item.belt}
                    name={item.name}
                    checkedAt={formatTime(item.checkin?.completedAt ?? "")}
                    // resolver esse b.o
                    checkinStatus={item.checkin!.status}
                    isCurrentUserInClass={item.id === currentUser?.id}
                  />
                )}
              />

              {classDetails?.status === "not-started" &&
                !isCurrentUserInClass && (
                  <Button
                    disabled={isCreatingCheckin}
                    loading={isCreatingCheckin}
                    onPress={handleCheckin}
                  >
                    Check-in
                  </Button>
                )}

              {classDetails?.status === "not-started" &&
                isCurrentUserInClass && (
                  <Button
                    variant="danger"
                    disabled={isCancellingCheckin}
                    loading={isCancellingCheckin}
                    onPress={handleCancelCheckin}
                  >
                    Cancelar check-in
                  </Button>
                )}
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
