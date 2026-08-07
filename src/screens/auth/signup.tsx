import { COLORS } from "@/utils/colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
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
              <TouchableOpacity style={styles.backBtn}>
                <MaterialIcons
                  name="keyboard-backspace"
                  size={22}
                  color="black"
                />
              </TouchableOpacity>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerH1}>Create Account</Text>
                <Text style={styles.text}>
                  Sign up to unlock the world of Parfait.
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Full Name</Text>
                  <View style={styles.formInput}>
                    <FontAwesome
                      name="user"
                      size={18}
                      color={COLORS.secondaryColor}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your full name"
                      keyboardType="default"
                      onChangeText={(text) => setName(text)}
                    />
                  </View>
                </View>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Email</Text>
                  <View style={styles.formInput}>
                    <MaterialIcons
                      name="email"
                      size={18}
                      color={COLORS.secondaryColor}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>
                </View>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Password</Text>
                  <View style={styles.formInput}>
                    <MaterialIcons
                      name="lock"
                      size={18}
                      color={COLORS.secondaryColor}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      onChangeText={(text) => setPassword(text)}
                      secureTextEntry
                    />
                  </View>
                </View>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Confirm Password</Text>
                  <View style={styles.formInput}>
                    <MaterialIcons
                      name="lock"
                      size={18}
                      color={COLORS.secondaryColor}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm your password"
                      onChangeText={(text) => setPasswordConfirmation(text)}
                      secureTextEntry
                    />
                  </View>
                </View>
                <View style={styles.checkContainer}>
                  {/* Checkbox View */}
                  <View style={styles.checkView}>
                    <Checkbox
                      value={remember}
                      onValueChange={setRemember}
                      color={remember ? COLORS.secondaryColor : undefined}
                    />
                    <Text style={styles.checkText}>Remember me</Text>
                  </View>
                  {/* Forgot Password Link */}
                  <TouchableOpacity>
                    <Text style={styles.link}>Forgot Password?</Text>
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

            {/* Signup Button */}
            <View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
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
    gap: wp("2%"),
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
