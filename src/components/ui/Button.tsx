import { COLORS } from "@/utils/colors";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  style,
  color,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color ?? COLORS.secondaryColor },
        style,
        disabled && { opacity: 0.5 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
  },
});
