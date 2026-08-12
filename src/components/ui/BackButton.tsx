import { COLORS } from "@/utils/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onPress?: () => void;
};

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <FontAwesome6 name="arrow-left-long" size={24} color={COLORS.textColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#d7d3d3",
    alignSelf: "flex-start",
  },
});
