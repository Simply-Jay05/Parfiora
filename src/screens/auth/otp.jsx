import AuthHeader from "@/components/auth/AuthHeader";
import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import OTPInput from "@/components/ui/OTPInput";
import { COLORS } from "@/utils/colors";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Otp() {
  const [otp, setOtp] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.wrapper}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View>
              <BackButton />
            </View>
            <View>
              <AuthHeader
                title="OTP code verification"
                subtitle="We have sent an OTP code to email and *****deo@gmail.com. Enter the OTP code below to verify."
              />
            </View>
            <View>
              <OTPInput length={4} value={otp} onChange={setOtp} />
            </View>
            <View style={styles.footertext}>
              <Text style={styles.text}>Didn't receive email?</Text>
              <Text style={styles.text}>
                You can resend code in <Text style={styles.timer}>52</Text> s
              </Text>
            </View>
          </View>
          <View>
            <Button title="Continue" style={styles.button} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("4%"),
    justifyContent: "space-between",
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    gap: wp("10%"),
  },
  button: {
    marginBottom: wp("4%"),
  },
  footertext: {
    alignItems: "center",
    gap: wp("2%"),
  },
  text: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
  },
  resendText: {},
  timer: { color: COLORS.secondaryColor },
});
