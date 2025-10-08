import { ClassesListCard } from "./ClassesListCard";
import { View } from "react-native";

interface IClassesListItemsProps {
  onOpen: () => void;
}

export function ClassesListItems({ onOpen }: IClassesListItemsProps) {
  return (
    <>
      <View style={{ paddingHorizontal: 16 }}>
        <ClassesListCard onOpen={onOpen} />
      </View>
    </>
  );
}
