import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type CheckoutNavigationProp = NativeStackNavigationProp<AppNav, "Checkout">;

export default function Checkout() {
  const navigation = useNavigation<CheckoutNavigationProp>();
  const { cartItems, clearCart } = useCart();
  const { createOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = 1000;
  const total = subtotal + deliveryFee;

  const handlePayment = () => {
    if (cartItems.length === 0) {
      return;
    }
    setIsProcessing(true);
    createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      status: "Pending",
    });
    clearCart();
    navigation.replace("OrderSuccess");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Ionicons
              name="location-outline"
              size={22}
              color={COLORS.primaryColor}
            />
          </View>

          <View style={styles.addressCard}>
            <Text style={styles.addressTitle}>Home</Text>
            <Text style={styles.addressText}>
              No. 12 Example Street, Abuja, Nigeria
            </Text>
            <Text style={styles.addressText}>+234 812 345 7890</Text>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderList}>
            {cartItems.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.orderItem}>
                <View style={styles.orderItemInfo}>
                  <Text style={styles.orderItemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.orderItemQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                </View>

                <Text style={styles.orderItemPrice}>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <View style={styles.paymentLeft}>
              <View style={styles.paymentIcon}>
                <Ionicons
                  name="card-outline"
                  size={24}
                  color={COLORS.primaryColor}
                />
              </View>

              <View>
                <Text style={styles.paymentTitle}>Paystack</Text>
                <Text style={styles.paymentDescription}>
                  Pay securely with your card
                </Text>
              </View>
            </View>

            <Ionicons
              name="checkmark-circle"
              size={24}
              color={COLORS.primaryColor}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
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
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          title={`Pay ₦${total.toLocaleString()}`}
          onPress={handlePayment}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("3%"),
  },
  headerTitle: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 20,
    color: COLORS.textColor,
  },
  content: {
    paddingHorizontal: wp("5%"),
    paddingBottom: wp("30%"),
    gap: wp("7%"),
  },
  section: {
    gap: wp("3%"),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 17,
    color: COLORS.textColor,
  },
  addressCard: {
    backgroundColor: "white",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    gap: wp("1%"),
    elevation: 1,
  },
  addressTitle: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },
  addressText: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.secondaryColor,
  },
  orderList: {
    gap: wp("3%"),
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderItemInfo: {
    flex: 1,
    marginRight: wp("4%"),
  },
  orderItemName: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.textColor,
  },
  orderItemQuantity: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: COLORS.secondaryColor,
  },
  orderItemPrice: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.textColor,
  },
  paymentMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: wp("4%"),
    borderRadius: wp("3%"),
    elevation: 1,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  paymentIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: `${COLORS.primaryColor}15`,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentTitle: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
    color: COLORS.textColor,
  },
  paymentDescription: {
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: COLORS.secondaryColor,
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
    fontSize: 14,
    color: COLORS.secondaryColor,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  totalText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 17,
    color: COLORS.textColor,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("4%"),
    backgroundColor: COLORS.bgColor,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
});
