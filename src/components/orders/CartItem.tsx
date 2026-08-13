import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type CartItemProps = {
  name: string;
  price: number;
  quantity: number;
  image: any;
};

export default function CartItem({
  name,
  price,
  quantity,
  image,
}: CartItemProps) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />

      <View style={styles.content}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>₦{price.toLocaleString()}</Text>
        </View>

        <View style={styles.quantityView}>
          <TouchableOpacity style={styles.quantityBtn}>
            <Ionicons name="remove" size={22} color="white" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityBtn}>
            <Ionicons name="add" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.bgSecColor,
    padding: wp("4%"),
    borderRadius: wp("4"),
    gap: wp("6%"),
    elevation: 2,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: {
    width: wp("24%"),
    height: wp("24%"),
    borderRadius: wp("3%"),
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "Manrope-Semibold",
    fontSize: 17,
    color: COLORS.textColor,
  },
  price: {
    fontFamily: "Manrope-Semibold",
    fontSize: 16,
    color: COLORS.secondaryColor,
    marginTop: wp("1"), //
  },
  quantityView: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
  },
  quantityBtn: {
    width: 30,
    height: 30,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondaryColor,
  },
  textColor: {},
  quantity: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
  },
});
