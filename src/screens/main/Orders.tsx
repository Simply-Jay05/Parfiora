import CartItem from "@/components/orders/CartItem";
import Button from "@/components/ui/Button";
import { cartItems } from "@/data/dummyData";
import { COLORS } from "@/utils/colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const deliveryFee = 1000;
  const total = subtotal + deliveryFee;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Orders</Text>

        <View style={styles.list}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
            />
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>
              {" "}
              ₦{subtotal.toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery Fee</Text>
            <Text style={styles.summaryText}>
              {" "}
              ₦{deliveryFee.toLocaleString()}
            </Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₦{total.toLocaleString()}</Text>
          </View>
        </View>

        <Button title="Proceed to Payment" style={styles.checkoutBtn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: wp("5%"),
  },
  wrapper: {
    paddingTop: wp("2%"),
    paddingBottom: wp("8%"),
    gap: wp("7%"),
  },
  title: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 28,
    color: COLORS.textColor,
  },

  list: {
    gap: wp("4%"),
  },
  summary: {
    gap: wp("3%"),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryText: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    color: COLORS.textColor,
  },
  divider: {
    height: 1,
    backgroundColor: "#DDD",
  },
  totalText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 19,
    color: COLORS.textColor,
  },
  checkoutBtn: {
    marginBottom: wp("5%"),
  },
});
