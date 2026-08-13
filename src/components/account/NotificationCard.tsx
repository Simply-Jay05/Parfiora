import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type NotificationCardProps = {
  title: string;
  message: string;
  time: string;
  icon: keyof typeof Ionicons.glyphMap | any;
  read: boolean;
  onPress?: () => void;
};

export default function NotificationCard({
  title,
  message,
  time,
  icon,
  read,
  onPress,
}: NotificationCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, !read && styles.unread]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={COLORS.secondaryColor} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {!read && <View style={styles.dot} />}
        </View>

        <Text style={styles.message}>{message}</Text>

        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: wp("4%"),
    paddingVertical: wp("3%"),
    paddingHorizontal: wp("2%"),
  },
  unread: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bgColor,
  },
  content: {
    flex: 1,
    gap: wp("1%"),
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
    color: COLORS.textColor,
  },
  message: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.textColor,
    lineHeight: 20,
  },
  time: {
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: COLORS.primaryColor,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondaryColor,
  },
});
