import { COLORS } from "@/utils/colors";
import { Image, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type OrderItemProps = {
  name: string;
  price: number;
  quantity: number;
  image: any;
};

export default function OrderItem({
  name,
  price,
  quantity,
  image,
}: OrderItemProps) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.quantity}>Quantity: {quantity}</Text>
        <Text style={styles.price}>₦{price.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
  },
  image: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("3%"),
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    gap: wp("1%"),
  },
  name: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
    color: COLORS.textColor,
  },
  quantity: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.primaryColor,
  },
  price: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.secondaryColor,
  },
});
