import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

interface IStepProps {
  children: React.ReactNode;
}

export function Step({ children }: IStepProps) {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {children}
    </View>
  );
}

export function StepContent({ children }: { children: React.ReactNode }) {
  return <View style={[styles.content]}>{children}</View>;
}

export function StepHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.header}>
      <AppText style={styles.title} size="3xl" weight="semiBold">
        {title}
      </AppText>
      <AppText style={styles.subtitle} color={theme.colors.mutedText}>
        {subtitle}
      </AppText>
    </View>
  );
}

interface IStepFoorterProps {
  children: React.ReactNode;
  align?: "start" | "end";
}

export function StepFooter({ children, align = "end" }: IStepFoorterProps) {
  return (
    <View
      style={[styles.footer, align === "end" && { alignItems: "flex-end" }]}
    >
      {children}
    </View>
  );
}
