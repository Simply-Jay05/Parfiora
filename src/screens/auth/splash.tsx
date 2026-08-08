import { COLORS } from "@/utils/colors";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Splash() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoView}>
        <Image
          style={styles.img}
          source={require("../../../assets/images/Parfiora-icon.png")}
        />
        <Text style={styles.logoTitle}>Parfiora</Text>
      </View>
      <View style={styles.spinnerView}>
        <ActivityIndicator size="large" color={COLORS.secondaryColor} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logoView: {},
  logoTitle: {
    fontSize: 36,
    fontFamily: "BricolageGrotesque-Bold",
    textAlign: "center",
  },
  img: {
    width: wp("35%"),
    height: wp("35%"),
    resizeMode: "contain",
    alignSelf: "center",
  },
  spinnerView: {
    transform: [{ scale: 2 }],
  },
  spinner: {},
});
