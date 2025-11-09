import { theme } from "@ui/styles/theme";
import React, { createContext, use } from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";

interface IRadioGroupContextValue {
  value: string | null;
  setValue: (value: string) => void;
  isHorizontal?: boolean;
  error: boolean;
}

const RadioGroupContext = createContext({} as IRadioGroupContextValue);
const RadioGroupItemContext = createContext({ isSelected: false });

interface IRadioGroupProps {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  value: string | null;
  onChangeValue: (value: string) => void;
  error?: boolean;
}

export function RadioGroup({
  children,
  orientation = "vertical",
  value,
  error = false,
  onChangeValue,
}: IRadioGroupProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <RadioGroupContext.Provider
      value={{ value, setValue: onChangeValue, error, isHorizontal }}
    >
      <View
        style={[styles.container, isHorizontal && styles.containerHorizontal]}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

interface IRadioGroupItemProps {
  children: React.ReactNode;
  value: string;
}

export function RadioGroupItem({ children, value }: IRadioGroupItemProps) {
  const {
    isHorizontal,
    value: selectedValue,
    setValue,
    error,
  } = use(RadioGroupContext);
  const isSelected = selectedValue === value;

  return (
    <RadioGroupItemContext.Provider value={{ isSelected }}>
      <TouchableOpacity
        style={[
          styles.item,
          isSelected && styles.selectedItem,
          isHorizontal && styles.horizontalItem,
          error && styles.errorItem,
        ]}
        onPress={() => setValue(value)}
      >
        {children}
      </TouchableOpacity>
    </RadioGroupItemContext.Provider>
  );
}

export function RadioGroupIcon({ children }: { children: string }) {
  const { isSelected } = use(RadioGroupItemContext);

  return (
    <View style={[styles.icon, isSelected && styles.selectedIcon]}>
      <AppText>{children}</AppText>
    </View>
  );
}

export function RadioGroupLabel({ children }: { children: string }) {
  return <AppText weight="semiBold">{children}</AppText>;
}

export function RadioGroupDescription({ children }: { children: string }) {
  return (
    <AppText size="xs" color={theme.colors.mutedText}>
      {children}
    </AppText>
  );
}

export function RadioGroupItemInfo({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View>{children}</View>;
}
