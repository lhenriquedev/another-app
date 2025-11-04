import { Children, cloneElement, isValidElement, ReactElement } from "react";
import { View } from "react-native";
import { styles } from "./styles";

interface IMenuListProps {
  children: React.ReactNode;
}

export function MenuList({ children }: IMenuListProps) {
  const childrenArray = Children.toArray(children);
  const lastIndex = childrenArray.length - 1;

  return (
    <View style={styles.menuList}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<any>, {
            isLast: index === lastIndex,
          });
        }
        return child;
      })}
    </View>
  );
}
