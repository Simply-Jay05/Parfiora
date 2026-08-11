import { COLORS } from "@/utils/colors";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type ProductCardProps = {
  name: string;
  price: number;
  image: ImageSourcePropType;
};

export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imgView}>
        <Image style={styles.img} source={image} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>₦{price.toLocaleString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "white",
    padding: wp("3%"),
    borderRadius: wp("3%"),
  },
  imgView: {
    width: "100%",
    height: wp("40%"),
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: wp("3%"),
  },
  name: {
    marginTop: wp("2%"),
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.textColor,
  },
  price: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-Regular",
    fontWeight: "bold",
    fontSize: 14,
    color: COLORS.secondaryColor,
  },
});
