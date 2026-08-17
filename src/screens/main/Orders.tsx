import CartItem from "@/components/orders/CartItem";
import EmptyCart from "@/components/orders/EmptyCart";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { AppNav, TabNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type OrdersNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNav, "Orders">,
  NativeStackNavigationProp<AppNav>
>;

export default function Orders() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigation = useNavigation<OrdersNavigationProp>();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const deliveryFee = 1000;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Your Orders</Text>

        <EmptyCart onExplore={() => navigation.navigate("Explore")} />
      </SafeAreaView>
    );
  }

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
          {cartItems.map((item) => (
            <CartItem
              key={`${item.id}-${item.size}-${item.base}-${item.toppings?.join("-")}-${item.extras?.join("-")}-${item.specialInstructions}`}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
              size={item.size}
              base={item.base}
              toppings={item.toppings}
              extras={item.extras}
              specialInstructions={item.specialInstructions}
              onDelete={() => removeFromCart(item)}
              onIncrease={() => updateQuantity(item, "increase")}
              onDecrease={() => updateQuantity(item, "decrease")}
            />
          ))}
        </View>

        {cartItems.length > 0 && (
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
