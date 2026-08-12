import { COLORS } from "@/utils/colors";
import { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  label: string;
  icon?: ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: TextInputProps["onBlur"];
};

export default function TextField({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputBox}>
        {icon}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp("2%"),
  },

  label: {
    fontFamily: "Manrope-SemiBold",
    fontWeight: "bold",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: wp("4%"),
    borderColor: COLORS.primaryColor,
    backgroundColor: COLORS.bgColor,
  },

  input: {
    flex: 1,
    paddingVertical: wp("4%"),
    marginLeft: wp("2%"),
  },
});
