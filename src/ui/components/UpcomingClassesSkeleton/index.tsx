import { View } from "react-native";
import { SkeletonBox } from "../SkeletonBox";
import { styles } from "./styles";

export function UpcomingClassesSkeleton() {
  return (
    <>
      {/* Header skeleton */}
      <View style={styles.header}>
        <SkeletonBox width={24} height={24} borderRadius={4} />
        <SkeletonBox width={120} height={20} borderRadius={4} />
      </View>

      {/* Cards skeleton */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <SkeletonBox width={100} height={16} borderRadius={4} />
              <View style={styles.spacing} />
              <SkeletonBox width={80} height={14} borderRadius={4} />
            </View>
            <View>
              <SkeletonBox width={60} height={16} borderRadius={4} />
              <View style={styles.spacing} />
              <SkeletonBox width={70} height={14} borderRadius={4} />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <SkeletonBox width={100} height={16} borderRadius={4} />
              <View style={styles.spacing} />
              <SkeletonBox width={80} height={14} borderRadius={4} />
            </View>
            <View>
              <SkeletonBox width={60} height={16} borderRadius={4} />
              <View style={styles.spacing} />
              <SkeletonBox width={70} height={14} borderRadius={4} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
