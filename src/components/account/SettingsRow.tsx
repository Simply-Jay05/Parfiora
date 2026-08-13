import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type SettingsRowProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  onPress?: () => void;
};

export default function SettingsRow({
  title,
  icon,
  size,
  onPress,
}: SettingsRowProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={size ? size : 28}
          color={COLORS.primaryColor}
        />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={25} color={COLORS.primaryColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: wp("4%"),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("6%"),
  },

  title: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },
});
