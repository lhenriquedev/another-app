import { Platform, Pressable, View } from "react-native";
import { AppText } from "../AppText";
import { buttonStyles, ButtonVariants, styles } from "./styles";

interface IButtonProps
  extends React.ComponentProps<typeof Pressable>,
  Omit<ButtonVariants, "disabled"> { }

export function Button({
  children,
  variant,
  size,
  disabled,
  style,
  ...props
}: IButtonProps) {
  const childEl =
    typeof children === "string" ? <AppText>{children}</AppText> : children;

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [
          buttonStyles({
            variant,
            size,
            disabled: disabled ? "true" : "false",
          }),
          pressed && Platform.OS === "ios" && { opacity: 0.7 },
          typeof style === "function" ? style({ pressed }) : style,
        ]}
        android_ripple={{ color: "rgba(0, 0, 0, 0.2)" }}
        disabled={disabled}
        {...props}
      >
        {childEl}
      </Pressable>
    </View>
  );
}
