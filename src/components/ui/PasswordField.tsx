import { COLORS } from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function PasswordField({
  label,
  placeholder,
  value,
  onChangeText,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputBox}>
        <MaterialIcons name="lock" size={20} color={COLORS.secondaryColor} />

        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />

        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={20}
            color={COLORS.secondaryColor}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: wp("2%") },

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
    marginHorizontal: 10,
  },
});
