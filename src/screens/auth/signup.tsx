import AuthHeader from "@/components/auth/AuthHeader";
import AppCheckbox from "@/components/ui/AppCheckbox";
import BackButton from "@/components/ui/BackButton";
import { useAuth } from "@/context/AuthContext";
import { AuthNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { signupValidationSchema } from "@/utils/validationSchema";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
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
  const [remember, setRemember] = useState(false);

  const navigation = useNavigation<SignupType>();
  const { signup } = useAuth();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
    isValid,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: () => {
      signup(values.firstName, values.lastName, values.email, values.password);
    },
    validationSchema: signupValidationSchema,
    validateOnMount: true,
  });

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
            showsVerticalScrollIndicator={false}
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
                  label="First Name"
                  icon={
                    <FontAwesome
                      name="user"
                      size={18}
                      color={COLORS.secondaryColor}
                    />
                  }
                  placeholder="Enter your first name"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                />
                {errors.firstName && touched.firstName && (
                  <Text style={styles.errorMsg}>{errors.firstName}</Text>
                )}
                <TextField
                  label="Last Name"
                  icon={
                    <FontAwesome
                      name="user"
                      size={18}
                      color={COLORS.secondaryColor}
                    />
                  }
                  placeholder="Enter your last name"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                />
                {errors.lastName && touched.lastName && (
                  <Text style={styles.errorMsg}>{errors.lastName}</Text>
                )}
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
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorMsg}>{errors.email}</Text>
                )}
                <PasswordField
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorMsg}>{errors.password}</Text>
                )}
                <PasswordField
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={values.passwordConfirmation}
                  onChangeText={handleChange("passwordConfirmation")}
                  onBlur={handleBlur("passwordConfirmation")}
                />
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation && (
                    <Text style={styles.errorMsg}>
                      {errors.passwordConfirmation}
                    </Text>
                  )}
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
                <Button
                  title="Sign Up"
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
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
    gap: wp("8%"),
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
  errorMsg: {
    fontFamily: "Manrope-Regular",
    color: "red",
    fontSize: 13,
  },
});
