import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type LocationCardProps = {
  label: string;
  address: string;
  icon: keyof typeof Ionicons.glyphMap | any;
  onPress?: () => void;
};

export default function LocationCard({
  label,
  address,
  icon,
  onPress,
}: LocationCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={25} color={COLORS.primaryColor} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>

      <Ionicons name="chevron-forward" size={25} color={COLORS.primaryColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
    paddingVertical: wp("4%"),
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  iconContainer: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    gap: wp("1%"),
  },
  label: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },
  address: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.primaryColor,
    lineHeight: 20,
  },
});
