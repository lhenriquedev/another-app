import { useSummary } from "@app/hooks/useSummary";
import { useUpcomingClasses } from "@app/hooks/useUpcomingClasses";
import { AppText } from "@ui/components/AppText";
import { Card, CardContainer, CardHeader, CardIcon } from "@ui/components/Card";
import { ClassListBottomSheet } from "@ui/components/ClassesList/ClassListBottomSheet";
import { IClassListBottomSheet } from "@ui/components/ClassesList/IClassListBottomSheet";
import { Screen } from "@ui/components/Screen";
import { SkeletonBox } from "@ui/components/SkeletonBox";
import { UpcomingClasses } from "@ui/components/UpcomingClasses";
import { theme } from "@ui/styles/theme";
import { Target, TrendingUp } from "lucide-react-native";
import { useRef, useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";

export function Home() {
  const bottomSheetHomeRef = useRef<IClassListBottomSheet>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const {
    data: upcomingClasses,
    isPending: isLoadingUpcomingClasses,
    error,
  } = useUpcomingClasses();

  const { data: summary, isPending: isLoadingSummary } = useSummary();

  const handleOnClassIdPress = (classId: string) => {
    bottomSheetHomeRef.current?.open();
    setSelectedClassId(classId);
  };

  return (
    <Screen hasScroll={false} style={{ flex: 1 }} headerType="home">
      <CardContainer style={{ marginBottom: 16, marginTop: 16 }}>
        <Card>
          {isLoadingSummary ? (
            <View>
              <AppText size="xs" color={theme.colors.mutedText}>
                Check-ins (mês)
              </AppText>
              <SkeletonBox width={60} height={28} style={{ marginTop: 4 }} />
            </View>
          ) : (
            <CardHeader
              label="Check-ins (mês)"
              title={String(summary?.checkinsThisMonth ?? 0)}
            />
          )}
          <CardIcon Icon={TrendingUp} color={theme.colors.primary} size={24} />
        </Card>

        <Card>
          {isLoadingSummary ? (
            <View>
              <AppText size="xs" color={theme.colors.mutedText}>
                Total de check-ins
              </AppText>
              <SkeletonBox width={60} height={28} style={{ marginTop: 4 }} />
            </View>
          ) : (
            <CardHeader
              label="Total de check-ins"
              title={String(summary?.totalCheckins ?? 0)}
            />
          )}
          <CardIcon Icon={Target} color={theme.colors.primary} size={24} />
        </Card>
      </CardContainer>

      <View style={styles.container}>
        <UpcomingClasses
          upcomingClasses={upcomingClasses ?? []}
          isLoadingUpcomingClasses={isLoadingUpcomingClasses}
          onClassPress={handleOnClassIdPress}
          error={error}
        />
      </View>

      <ClassListBottomSheet
        ref={bottomSheetHomeRef}
        selectedClassId={selectedClassId}
        onSelectedClass={handleOnClassIdPress}
      />
    </Screen>
  );
}
