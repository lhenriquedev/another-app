import { Screen } from "@ui/components/Screen";
import { UpcomingClasses } from "@ui/components/UpcomingClasses";
import { useRef, useState } from "react";
import { IClassListBottomSheet } from "@ui/components/ClassesList/IClassListBottomSheet";
import { useUpcomingClasses } from "@app/hooks/useUpcomingClasses";
import { ClassListBottomSheet } from "@ui/components/ClassesList/ClassListBottomSheet";
import { Clock, Flame, Target, TrendingUp } from "lucide-react-native";
import { Card, CardContainer, CardHeader, CardIcon } from "@ui/components/Card";
import { theme } from "@ui/styles/theme";

export function Home() {
  const bottomSheetHomeRef = useRef<IClassListBottomSheet>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const {
    data: upcomingClasses,
    isPending: isLoadingUpcomingClasses,
    error,
  } = useUpcomingClasses();

  const handleOnClassIdPress = (classId: string) => {
    bottomSheetHomeRef.current?.open();
    setSelectedClassId(classId);
  };

  return (
    <Screen hasScroll={false} style={{ flex: 1 }} headerType="home">
      <CardContainer style={{ marginBottom: 16, marginTop: 16 }}>
        <Card>
          <CardHeader label="Streak atual" title="7 dias" />
          <CardIcon
            Icon={Flame}
            color={theme.colors.yellow.DEFAULT}
            size={24}
          />
        </Card>

        <Card>
          <CardHeader label="Check-ins (mês)" title="18" />
          <CardIcon
            Icon={TrendingUp}
            color={theme.colors.yellow.DEFAULT}
            size={24}
          />
        </Card>
      </CardContainer>

      <CardContainer style={{ marginBottom: 16 }}>
        <Card>
          <CardHeader label="Horas de treino" title="243" />
          <CardIcon
            Icon={Clock}
            color={theme.colors.yellow.DEFAULT}
            size={24}
          />
        </Card>

        <Card>
          <CardHeader label="Total de check-ins" title="7 dias" />
          <CardIcon
            Icon={Target}
            color={theme.colors.yellow.DEFAULT}
            size={24}
          />
        </Card>
      </CardContainer>

      <UpcomingClasses
        upcomingClasses={upcomingClasses ?? []}
        isLoadingUpcomingClasses={isLoadingUpcomingClasses}
        onClassPress={handleOnClassIdPress}
        error={error}
      />

      <ClassListBottomSheet
        ref={bottomSheetHomeRef}
        selectedClassId={selectedClassId}
        onSelectedClass={handleOnClassIdPress}
      />
    </Screen>
  );
}
