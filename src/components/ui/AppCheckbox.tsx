import { COLORS } from "@/utils/colors";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function AppCheckbox({ label, value, onValueChange }: Props) {
  return (
    <View style={styles.container}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
        color={value ? COLORS.secondaryColor : undefined}
      />

      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: wp("2%"),
    alignItems: "center",
  },

  text: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
  },
});
