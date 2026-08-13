import CartItem from "@/components/orders/CartItem";
import Button from "@/components/ui/Button";
import { cartItems } from "@/data/dummyData";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type OrdersTypes = NavigationProp<AppNav, "Orders">;

export default function Orders() {
  const [items, setItems] = useState(cartItems);
  const navigation = useNavigation<OrdersTypes>();

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Cart Order</Text>
          <TouchableOpacity
            style={styles.myOrdersBtn}
            onPress={() => navigation.navigate("MyOrders")}
          >
            <Ionicons name="receipt" size={23} color={COLORS.primaryColor} />
            <Text style={styles.myOrdersText}>My Orders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
              onDelete={() => removeItem(item.id)}
            />
          ))}
        </View>

        {items.length > 0 && (
          <>
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Subtotal</Text>
                <Text style={styles.summaryText}>
                  ₦{subtotal.toLocaleString()}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Delivery Fee</Text>
                <Text style={styles.summaryText}>
                  ₦{deliveryFee.toLocaleString()}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalText}>₦{total.toLocaleString()}</Text>
              </View>
            </View>

            <Button
              title="Proceed to Payment"
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate("Checkout")}
            />
          </>
        )}

        {items.length === 0 && (
          <View style={styles.emptyCart}>
            <Ionicons
              name="cart-outline"
              size={70}
              color={COLORS.primaryColor}
            />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>
              Explore delicious parfaits and add something to your cart.
            </Text>
          </View>
        )}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 26,
    color: COLORS.textColor,
  },
  myOrdersBtn: {
    alignItems: "center",
  },

  myOrdersText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 13,
    color: COLORS.primaryColor,
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
  emptyTitle: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 20,
    color: COLORS.textColor,
  },

  emptyText: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    color: COLORS.primaryColor,
    textAlign: "center",
    paddingHorizontal: wp("10%"),
  },
  emptyCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: wp("20%"),
    gap: wp("3%"),
  },
});
