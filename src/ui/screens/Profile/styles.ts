import { theme } from "@ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileContent: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  profileAvatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatar: {
    width: 84,
    height: 84,
    borderRadius: 100,
    marginBottom: 24,
  },
  profileFormContent: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: 16,
    borderRadius: 10,
    // marginTop: 32,
    gap: 8,
    justifyContent: "space-between",
  },
  profileTabContainer: {
    marginTop: 24,
    flexDirection: "row",
    position: "relative",
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    zIndex: 20,
  },
  profileTabButton: {
    backgroundColor: theme.colors.card,
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  profileGeneral: {
    gap: 16,
  },
  profileCardContainer: {
    flexDirection: "row",
    gap: 16,
  },
  profileCardContent: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
  },
  profileCardIcon: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 10,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  profileCardBelt: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
  },

  profileCardActivityHeader: {
    flexDirection: "row",
    gap: 8,
  },

  profileCardActivityContainer: {
    gap: 16,
    marginTop: 16,
  },

  profileCardActivityContent: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  profileCardActivityText: {
    gap: 8,
  },

  animatedBorder: {
    position: "absolute",
    bottom: -2,
    left: 0,
    height: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
});
