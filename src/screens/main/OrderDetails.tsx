import BackButton from "@/components/ui/BackButton";
import { useOrders } from "@/context/OrderContext";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderDetailsRouteProp = RouteProp<AppNav, "OrderDetails">;

export default function OrderDetails() {
  const route = useRoute<OrderDetailsRouteProp>();
  const { orderId } = route.params;
  const { orders } = useOrders();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>Order Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Order not found.</Text>
        </View>
      </SafeAreaView>
    );
  }
  const totalQuantity = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.orderInfo}>
          <View>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.date}>
              {new Date(order.createdAt).toLocaleString()}
            </Text>
          </View>
          <View style={styles.status}>
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.items}>
            {order.items.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.item}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemDetails}>
                    Quantity: {item.quantity}
                  </Text>
                  {item.size && (
                    <Text style={styles.itemDetails}>Size: {item.size}</Text>
                  )}
                  {item.base && (
                    <Text style={styles.itemDetails}>Base: {item.base}</Text>
                  )}
                  {item.toppings && item.toppings.length > 0 && (
                    <Text style={styles.itemDetails}>
                      Toppings: {item.toppings.join(", ")}
                    </Text>
                  )}
                  {item.extras && item.extras.length > 0 && (
                    <Text style={styles.itemDetails}>
                      Extras: {item.extras.join(", ")}
                    </Text>
                  )}
                </View>
                <Text style={styles.itemPrice}>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Items ({totalQuantity})</Text>
              <Text style={styles.summaryText}>
                ₦{order.subtotal.toLocaleString()}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Delivery Fee</Text>
              <Text style={styles.summaryText}>
                ₦{order.deliveryFee.toLocaleString()}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>
                ₦{order.total.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: wp("4%"),
  },
  headerTitle: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 20,
    color: COLORS.textColor,
  },
  content: {
    paddingTop: wp("3%"),
    paddingBottom: wp("10%"),
    gap: wp("7%"),
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: wp("4%"),
    borderRadius: wp("4%"),
    elevation: 1,
  },
  orderId: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },
  date: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: COLORS.secondaryColor,
  },
  status: {
    paddingHorizontal: wp("3%"),
    paddingVertical: wp("1.5%"),
    borderRadius: wp("4%"),
    backgroundColor: `${COLORS.primaryColor}15`,
  },
  statusText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 12,
    color: COLORS.primaryColor,
  },
  section: {
    gap: wp("3%"),
  },
  sectionTitle: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 17,
    color: COLORS.textColor,
  },
  items: {
    backgroundColor: "white",
    borderRadius: wp("4%"),
    paddingHorizontal: wp("4%"),
    elevation: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: wp("3%"),
    paddingVertical: wp("4%"),
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
    color: COLORS.textColor,
  },
  itemDetails: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.secondaryColor,
  },
  itemPrice: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.textColor,
  },
  summary: {
    backgroundColor: "white",
    borderRadius: wp("4%"),
    padding: wp("4%"),
    gap: wp("3%"),
    elevation: 1,
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
    backgroundColor: "#EEEEEE",
  },
  totalText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 17,
    color: COLORS.textColor,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontFamily: "Manrope-Regular",
    fontSize: 15,
    color: COLORS.secondaryColor,
  },
});
