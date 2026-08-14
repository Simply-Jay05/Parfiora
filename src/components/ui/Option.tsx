import { COLORS } from "@/utils/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type OptionProps = {
  label: string;
  price?: string;
};

export default function Option({ label, price }: OptionProps) {
  return (
    <TouchableOpacity style={styles.option}>
      <View style={styles.radio} />
      <Text style={styles.optionText}>{label}</Text>
      {price && <Text style={styles.optionPrice}>{price}</Text>}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: wp("3%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayAccent,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.primaryColor,
    marginRight: wp("3%"),
  },
  optionText: {
    flex: 1,
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    color: COLORS.textColor,
  },

  optionPrice: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 13,
    color: COLORS.primaryColor,
  },
});
