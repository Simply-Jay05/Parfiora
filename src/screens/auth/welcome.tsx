import { COLORS } from "@/utils/colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import AppleLogo from "../../../assets/icons/apple.svg";
import FacebookLogo from "../../../assets/icons/facebook.svg";
import GoogleLogo from "../../../assets/icons/google.svg";
import XLogo from "../../../assets/icons/x.svg";

export default function Welcome() {
  return (
    <SafeAreaView style={styles.continer}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            style={styles.img}
            source={require("../../../assets/images/Parfiora-icon.png")}
          />
          <Text style={styles.headerTitle}>Parfiora</Text>
          <Text style={styles.headerText}>Let's dive into your account!</Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.socialBtn}>
            <GoogleLogo width={24} height={24} />
            <Text style={styles.text}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <AppleLogo width={24} height={24} />
            <Text style={styles.text}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <FacebookLogo width={24} height={24} />
            <Text style={styles.text}>Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <XLogo width={24} height={24} />
            <Text style={styles.text}>Continue with X</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.signInBtn}>
            <Text style={styles.signInText}>Sign in with password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    gap: wp("11%"),
    alignItems: "center",
  },
  header: {},
  headerTitle: {
    fontSize: 36,
    fontFamily: "BricolageGrotesque-Bold",
    textAlign: "center",
  },
  headerText: {
    fontSize: 16,
    fontFamily: "Manrope-Regular",
    color: COLORS.textColor,
  },
  img: {
    width: wp("35%"),
    height: wp("35%"),
    resizeMode: "contain",
    alignSelf: "center",
  },
  btnView: {
    gap: wp("3%"),
  },
  socialBtn: {
    flexDirection: "row",
    gap: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    width: wp("80%"),
  },
  text: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
  },
  signInBtn: {
    flexDirection: "row",
    gap: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.secondaryColor,
    width: wp("80%"),
  },
  signInText: {
    color: "white",
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  footerLink: {
    color: COLORS.secondaryColor,
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
  },
});
