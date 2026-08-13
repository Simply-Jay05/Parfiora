import OrderItem from "@/components/orders/OrderItem";
import BackButton from "@/components/ui/BackButton";
import { COLORS } from "@/utils/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderDetailsRouteParams = {
  OrderDetails: {
    order: {
      id: string;
      shop: string;
      date: string;
      status: string;
      total: number;
      deliveryFee: number;
      address: string;
      items: any[];
    };
  };
};

export default function OrderDetails() {
  const route = useRoute<RouteProp<OrderDetailsRouteParams, "OrderDetails">>();

  const { order } = route.params;

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
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
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          {/* Order Information */}
          <View style={styles.orderInfo}>
            <View>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.date}>Ordered on {order.date}</Text>
            </View>
            <Text
              style={[
                styles.status,
                order.status === "Delivered" && styles.delivered,
                order.status === "Processing" && styles.processing,
                order.status === "Cancelled" && styles.cancelled,
              ]}
            >
              {order.status}
            </Text>
          </View>

          {/* Shop */}
          <View>
            <Text style={styles.sectionTitle}>Shop</Text>
            <Text style={styles.shop}>{order.shop}</Text>
          </View>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.items}>
            {order.items.map((item) => (
              <OrderItem
                key={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
              />
            ))}
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Location</Text>
          <Text style={styles.address}>{order.address}</Text>
        </View>

        {/* Payment Summary */}
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
    fontSize: 24,
    color: COLORS.textColor,
  },
  content: {
    gap: wp("7%"),
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 17,
    color: COLORS.textColor,
  },
  date: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.primaryColor,
  },
  status: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
  },
  delivered: {
    color: "#2E9B50",
  },
  processing: {
    color: "#E09B22",
  },
  cancelled: {
    color: "#D9534F",
  },
  section: {
    gap: wp("3%"),
    backgroundColor: COLORS.bgSecColor,
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("2%"),
    elevation: 1,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 18,
    color: COLORS.textColor,
  },
  shop: {
    fontFamily: "Manrope-Regular",
    fontSize: 15,
    color: COLORS.primaryColor,
  },
  items: {
    gap: wp("6%"),
  },
  address: {
    fontFamily: "Manrope-Regular",
    fontSize: 15,
    color: COLORS.textColor,
    lineHeight: 23,
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
    fontSize: 15,
    color: COLORS.textColor,
  },
  divider: {
    height: 1,
    backgroundColor: "#DDD",
  },
  totalText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 18,
    color: COLORS.textColor,
  },
});
