import { useAuth } from "@app/contexts/AuthContext";
import { BELTS, BeltType } from "@app/hooks/useBelts";
import { useCancelCheckin } from "@app/hooks/useCancelCheckin";
import { useClassById } from "@app/hooks/useClassById";
import { useCreateCheckin } from "@app/hooks/useCreateCheckin";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { isAxiosError } from "axios";
import { Target } from "lucide-react-native";
import { useCallback, useImperativeHandle, useRef } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { EmptyState } from "../EmptyState";
import { ClassDetailsSkeleton } from "./ClassDetailsSkeleton";
import { ClassListBottomSheetCard } from "./ClassListBottomSheetCard";
import { IClassListBottomSheet } from "./IClassListBottomSheet";
import { styles } from "./styles";
import { formatTime } from "./utils";
import { theme } from "@ui/styles/theme";

interface IClassListBottomSheetProps {
  ref: React.Ref<IClassListBottomSheet>;
  selectedClassId: string | null;
  onSelectedClass: (classId: string) => void;
}

export function ClassListBottomSheet({
  ref,
  selectedClassId,
}: IClassListBottomSheetProps) {
  const { user } = useAuth();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

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

  const { data: classDetails, isLoading } = useClassById(selectedClassId!);

  const { mutateAsync: createCheckin, isPending: isCreatingCheckin } =
    useCreateCheckin(selectedClassId!);

  const { mutateAsync: cancelCheckin, isPending: isCancellingCheckin } =
    useCancelCheckin(selectedClassId!);

  const handleCheckin = async () => {
    try {
      await createCheckin();
      toast.success("Check-in realizado com sucesso!");
      // bottomSheetModalRef.current?.close();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleCancelCheckin = async () => {
    try {
      await cancelCheckin();
      toast.success("Check-in cancelado com sucesso!");
      // bottomSheetModalRef.current?.close();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const currentUserInClass = classDetails?.students.find(
    (u) => u.id === user?.id
  );
  const isCurrentUserInClass = !!currentUserInClass;
  const isNotStarted = classDetails?.status === "not-started";

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        maxDynamicContentSize={500}
        backgroundStyle={{ backgroundColor: theme.colors.card }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.mutedText }}
      >
        <BottomSheetScrollView
          style={[styles.bottomSheetContainer]}
          contentContainerStyle={{ paddingBottom: bottom + 16 }}
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
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => (
                  <ClassListBottomSheetCard
                    avatarUrl="https://imgs.search.brave.com/sYS3AaZj_MVIbF5CaDMKshfK2uVKaByHEboqLMlk1Fw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNvbGxpZGVy/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjUvMDMv/cmljay1tb3J0eS1w/b3J0YWwuanBnP3E9/NDkmZml0PWNyb3Am/dz0zNjAmaD0yNDAm/ZHByPTI"
                    belt={item.belt}
                    name={item.name}
                    checkedAt={formatTime(item.checkin?.completedAt ?? "")}
                    checkinStatus={item.checkin!.status}
                    isCurrentUserInClass={item.id === currentUserInClass?.id}
                  />
                )}
                ListEmptyComponent={
                  <EmptyState
                    title="Nenhum aluno fez check-in"
                    description={
                      isNotStarted ? "Seja o primeiro a entrar na aula" : ""
                    }
                    icon={<Target />}
                  />
                }
              />

              {isNotStarted && !isCurrentUserInClass && (
                <Button
                  disabled={isCreatingCheckin}
                  loading={isCreatingCheckin}
                  onPress={handleCheckin}
                >
                  Check-in
                </Button>
              )}

              {isNotStarted && isCurrentUserInClass && (
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
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
