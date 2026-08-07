import AuthHeader from "@/components/auth/AuthHeader";
import AppCheckbox from "@/components/ui/AppCheckbox";
import BackButton from "@/components/ui/BackButton";
import PasswordField from "@/components/ui/PasswordField";
import TextField from "@/components/ui/TextField";
import { COLORS } from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.wrapper}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              {/* Back Button */}
              <BackButton />
              {/* Header */}
              <AuthHeader
                title="Welcome Back"
                subtitle="Please enter your details to sign in."
              />
              {/* Form */}
              <View style={styles.form}>
                <TextField
                  label="Email"
                  icon={
                    <MaterialIcons
                      name="email"
                      size={18}
                      color={COLORS.secondaryColor}
                    />
                  }
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                />
                <PasswordField
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                />
                {/* Checkbox View */}
                <View style={styles.checkContainer}>
                  <AppCheckbox
                    label="Remember me"
                    value={remember}
                    onValueChange={setRemember}
                  />
                  {/* Forgot Password Link */}
                  <TouchableOpacity>
                    <Text style={styles.link}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Sign up Link */}
              <View style={styles.linkView}>
                <Text style={styles.text}>Don't have an account?</Text>
                <TouchableOpacity>
                  <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <Button title="Sign In" style={styles.button} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("5%"),
  },
  wrapper: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  content: {
    gap: wp("10%"),
  },
  header: {
    gap: wp("4%"),
  },
  headerH1: {
    fontFamily: "BricolageGrotesque-Bold",
    fontSize: 25,
    color: COLORS.textColor,
  },
  text: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
  },
  form: {
    gap: wp("5%"),
  },
  formField: {
    gap: wp("1%"),
  },
  formLabel: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    fontWeight: "bold",
  },
  formInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    backgroundColor: COLORS.bgColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
    gap: wp("2%"),
  },
  input: {
    flex: 1,
    paddingVertical: wp("4%"),
    color: COLORS.textColor,
    fontSize: 15,
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkView: {
    flexDirection: "row",
    gap: wp("2%"),
    alignItems: "center",
  },
  check: {},
  checkText: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    fontWeight: "semibold",
  },
  link: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.secondaryColor,
  },
  linkView: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("1%"),
  },
  button: {
    marginBottom: wp("4%"),
    backgroundColor: COLORS.secondaryColor,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bgColor,
  },
});
