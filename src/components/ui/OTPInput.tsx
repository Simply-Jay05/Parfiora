import { COLORS } from "@/utils/colors";
import { useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputKeyPressEvent,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type OTPInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
};

export default function OTPInput({
  length = 4,
  value,
  onChange,
}: OTPInputProps) {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (text: string, index: number) => {
    // Remove anything that isn't a number
    const digits = text.replace(/[^0-9]/g, "");
    if (!digits) return;

    // Create a copy of the current OTP
    const newOtp = value.split("");

    // Handle pasted/multiple digits
    for (let i = 0; i < digits.length; i++) {
      if (index + i >= length) break;
      newOtp[index + i] = digits[i];
    }

    // Convert back to a string
    const newValue = newOtp.join("").slice(0, length);
    onChange(newValue);

    // Move focus to the next box
    const nextIndex = index + digits.length;

    if (nextIndex < length) {
      inputRefs.current[nextIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }
  };

  const handleKeyPress = (event: TextInputKeyPressEvent, index: number) => {
    if (event.nativeEvent.key !== "Backspace") {
      return;
    }

    // If current box contains a number, remove it
    if (value[index]) {
      const newValue = value.slice(0, index) + value.slice(index + 1);
      onChange(newValue);
      return;
    }

    // If current box is empty, go to the previous box
    if (index > 0) {
      const newValue = value.slice(0, index - 1) + value.slice(index);
      onChange(newValue);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={[styles.input, focusedIndex === index && styles.inputFocused]}
          value={value[index] ?? ""}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          keyboardType="number-pad"
          maxLength={length}
          textAlign="center"
          selectionColor={COLORS.primaryColor}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    width: wp("20%"),
    height: wp("18%"),
    borderRadius: wp("2%"),
    backgroundColor: COLORS.bgColor,
    fontFamily: "Manrope-SemiBold",
    fontSize: 20,
    color: COLORS.textColor,
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: COLORS.secondaryColor,
  },
});
