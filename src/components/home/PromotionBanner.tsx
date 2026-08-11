import { COLORS } from "@/utils/colors";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function PromotionBanner() {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/images/promotion-banner.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: wp("2%"),
    paddingBottom: wp("2%"),
    borderRadius: wp("4%"),
  },

  image: {
    width: wp("80%"),
    height: wp("45%"),
    alignSelf: "center",
  },
});
