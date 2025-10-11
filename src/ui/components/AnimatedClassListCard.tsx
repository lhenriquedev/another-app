import React from "react";
import { ClassListCard } from "./ClassesList/ClassListCard";
import { IClass } from "./ClassesList/class.types";
import { FadeSlideView } from "./FadeSlideView";

interface AnimatedClassListCardProps {
  item: IClass;
  isLast: boolean;
  isFirst: boolean;
  isLastInGroup: boolean;
  onClassPress: (item: IClass) => void;
  index: number;
}

export function AnimatedClassListCard({
  item,
  isLast,
  isFirst,
  isLastInGroup,
  onClassPress,
  index,
}: AnimatedClassListCardProps) {
  return (
    <FadeSlideView
      triggerKey={item.id}
      delay={index * 50} // 50ms de delay por card
      duration={400}
      slideDistance={20}
    >
      <ClassListCard
        item={item}
        isLast={isLast}
        isFirst={isFirst}
        isLastInGroup={isLastInGroup}
        onClassPress={onClassPress}
      />
    </FadeSlideView>
  );
}
