import { BlurEvent, TextInput, FocusEvent, TextInputProps } from "react-native";
import { inputStyles } from "./styles";
import { theme } from "@ui/styles/theme";
import React, { useState } from "react";

type BaseTextInputProps = Omit<TextInputProps, "readOnly">;

export interface InputProps extends BaseTextInputProps {
  mask?: string;
  error?: boolean;
  disabled?: boolean;
  ref?: React.Ref<TextInput>;
  InputComponent?: React.ComponentType<TextInputProps>;
}

export function Input({
  style,
  error,
  disabled,
  mask,
  InputComponent = TextInput,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [maskedValue, setMaskedValue] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  function handleFocus(event: FocusEvent) {
    setIsFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: BlurEvent) {
    setIsFocused(false);

    onBlur?.(event);
  }

  function handleChangeText(text: string) {
    const value = mask ? applyMask(text, mask) : text;
    setMaskedValue(value);
    onChangeText?.(value);
  }

  return (
    <InputComponent
      style={[
        inputStyles({
          status: error ? "error" : isFocused ? "focus" : "default",
        }),
        style,
      ]}
      placeholderTextColor={theme.colors.platinum[800]}
      readOnly={disabled}
      value={mask ? maskedValue : props.value}
      onChangeText={handleChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
}

function applyMask(value: string, mask: string): string {
  const cleanValue = value.replace(/\D/g, "");
  let result = "";
  let j = 0;

  for (let i = 0; i < mask.length && j < cleanValue.length; i++) {
    if (mask[i] === "9") {
      result += cleanValue[j++];
    } else {
      result += mask[i];
    }
  }

  return result;
}
