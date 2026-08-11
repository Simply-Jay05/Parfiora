import { popularMenu } from "@/data/homeData";
import { COLORS } from "@/utils/colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function ProductCard() {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={require("../../../assets/images/products/classic(1).png")}
        />
      </View>
      <Text style={styles.name}>{popularMenu[0].name}</Text>
      <Text style={styles.price}>{popularMenu[0].price.toLocaleString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    // backgroundColor: "white",
  },
  imgView: {
    width: "100%",
    height: wp("40%"),
    borderRadius: wp("3%"),
    backgroundColor: "#F2F2F2",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    marginTop: wp("2%"),
    fontFamily: "Manrope-SemiBold",
    fontSize: 1,
    color: COLORS.textColor,
  },
  price: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-SemiBold",
    fontSize: 13,
    color: COLORS.secondaryColor,
  },
});
