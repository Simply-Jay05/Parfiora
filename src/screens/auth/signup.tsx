import AuthHeader from "@/components/auth/AuthHeader";
import AppCheckbox from "@/components/ui/AppCheckbox";
import BackButton from "@/components/ui/BackButton";
import { AuthNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
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
import PasswordField from "../../components/ui/PasswordField";
import TextField from "../../components/ui/TextField";

type SignupType = NavigationProp<AuthNav, "Signup">;

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [remember, setRemember] = useState(false);

  const navigation = useNavigation<SignupType>();

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
                title="Create Account"
                subtitle="Sign up to unlock the world of Parfait."
              />
              {/* Form */}
              <View style={styles.form}>
                <TextField
                  label="Full Name"
                  icon={
                    <FontAwesome
                      name="user"
                      size={18}
                      color={COLORS.secondaryColor}
                    />
                  }
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={setName}
                />
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
                <PasswordField
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={passwordConfirmation}
                  onChangeText={setPasswordConfirmation}
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
              <View style={styles.footerView}>
                {/* Signup Button */}
                <Button title="Sign Up" />
                {/* Sign up Link */}
                <View style={styles.linkView}>
                  <Text style={styles.text}>Already have an account?</Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  text: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
  },
  form: {
    gap: wp("5%"),
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  footerView: {
    gap: wp("2%"),
  },
});
