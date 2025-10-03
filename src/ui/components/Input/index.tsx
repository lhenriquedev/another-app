import { BlurEvent, TextInput, FocusEvent, TextInputProps } from "react-native";
import { inputStyles } from "./styles";
import { theme } from "@ui/styles/theme";
import React, { useState } from "react";

type BaseTextInputProps = Omit<TextInputProps, 'readOnly'>

export interface InputProps extends BaseTextInputProps {
  error?: boolean;
  disabled?: boolean;
  ref?: React.Ref<TextInput>;
  InputComponent?: React.ComponentType<TextInputProps>;
}

export function Input({ style, error, disabled, InputComponent = TextInput, onFocus, onBlur, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus(event: FocusEvent) {
    setIsFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: BlurEvent) {
    setIsFocused(false)
    onBlur?.(event);
  }

  return (
    <InputComponent
      style={[inputStyles({ status: error ? 'error' : (isFocused ? 'focus' : 'default') }), style]}
      placeholderTextColor={theme.colors.platinum[800]}
      readOnly={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  )
}
