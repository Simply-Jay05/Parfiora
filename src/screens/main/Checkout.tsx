import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { cartItems } from "@/data/dummyData";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
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

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = 1000;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity style={styles.addressCard}>
            <View style={styles.addressIcon}>
              <Ionicons
                name="location"
                size={22}
                color={COLORS.secondaryColor}
              />
            </View>

            <View style={styles.addressContent}>
              <Text style={styles.addressTitle}>Home</Text>
              <Text style={styles.addressText}>
                12 Ademola Crescent, Wuse 2, Abuja
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color={COLORS.primaryColor}
            />
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Items ({cartItems.length})</Text>
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

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "card" && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod("card")}
          >
            <View style={styles.paymentLeft}>
              <Ionicons
                name="card-outline"
                size={24}
                color={COLORS.secondaryColor}
              />

              <Text style={styles.paymentText}>Debit / Credit Card</Text>
            </View>
            <Ionicons
              name={
                paymentMethod === "card"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={22}
              color={COLORS.secondaryColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "transfer" && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod("transfer")}
          >
            <View style={styles.paymentLeft}>
              <Ionicons
                name="business-outline"
                size={24}
                color={COLORS.secondaryColor}
              />

              <Text style={styles.paymentText}>Bank Transfer</Text>
            </View>

            <Ionicons
              name={
                paymentMethod === "transfer"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={22}
              color={COLORS.secondaryColor}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <Button
        title={`Place Order • ₦${total.toLocaleString()}`}
        style={styles.placeOrderButton}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: wp("5%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: wp("4%"),
  },
  headerTitle: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 20,
    color: COLORS.textColor,
  },
  content: {
    paddingTop: wp("4%"),
    paddingBottom: wp("8%"),
    gap: wp("7%"),
  },
  section: {
    gap: wp("3%"),
  },
  sectionTitle: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 18,
    color: COLORS.textColor,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
    backgroundColor: "white",
    padding: wp("4%"),
    borderRadius: wp("4%"),
  },
  addressIcon: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5%"),
    backgroundColor: COLORS.bgColor,
    justifyContent: "center",
    alignItems: "center",
  },
  addressContent: {
    flex: 1,
    gap: wp("1%"),
  },
  addressTitle: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },
  addressText: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.primaryColor,
    lineHeight: 20,
  },
  summary: {
    backgroundColor: "white",
    padding: wp("4%"),
    borderRadius: wp("4%"),
    gap: wp("3%"),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryText: {
    fontFamily: "Manrope-Regular",
    fontSize: 15,
    color: COLORS.textColor,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  totalText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 18,
    color: COLORS.textColor,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: wp("4%"),
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: wp("4%"),
  },
  selectedPayment: {
    borderColor: COLORS.secondaryColor,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
  },
  paymentText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
    color: COLORS.textColor,
  },
  placeOrderButton: {
    marginBottom: wp("4%"),
  },
});
