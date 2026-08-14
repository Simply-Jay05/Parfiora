import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
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
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  showFavorite?: boolean;
};

type ProduCardType = NavigationProp<AppNav, "ProductDetails">;

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  const navigation = useNavigation<ProduCardType>();
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", {
            id,
            name,
            price,
            image,
          } as never)
        }
      >
        <View style={styles.imgView}>
          <Image style={styles.img} source={image} />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>₦{price.toLocaleString()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "white",
    padding: wp("3%"),
    borderRadius: wp("3%"),
    elevation: 2,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
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
