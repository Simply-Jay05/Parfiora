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
  style?: StyleProp<ViewStyle>;
};

export default function Button({ title, onPress, style }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondaryColor,
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
