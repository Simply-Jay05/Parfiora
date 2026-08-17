import BackButton from "@/components/ui/BackButton";
import { useOrders } from "@/context/OrderContext";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type MyOrdersNavigationProps = NativeStackNavigationProp<AppNav, "MyOrders">;

export default function MyOrders() {
  const { orders, isOrdersLoading, ordersError } = useOrders();
  const navigation = useNavigation<MyOrdersNavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={{ width: 40 }} />
      </View>

      {isOrdersLoading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryColor} />
          <Text style={styles.emptyText}>Loading your orders...</Text>
        </View>
      ) : ordersError ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="cloud-offline-outline"
              size={60}
              color={COLORS.primaryColor}
            />
          </View>
          <Text style={styles.emptyTitle}>Couldn&apos;t load orders</Text>
          <Text style={styles.emptyText}>{ordersError}</Text>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="receipt-outline"
              size={60}
              color={COLORS.primaryColor}
            />
          </View>

          <Text style={styles.emptyTitle}>No orders yet</Text>

          <Text style={styles.emptyText}>
            Your completed orders will appear here.
          </Text>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate("Home" as never)}
          >
            <Text style={styles.exploreText}>Explore Parfaits</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {orders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() =>
                navigation.navigate("OrderDetails", { orderId: order.id })
              }
            >
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>{order.id}</Text>

                  <Text style={styles.date}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Text>
                </View>

                <View style={styles.status}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.orderFooter}>
                <Text style={styles.itemCount}>
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </Text>

                <Text style={styles.total}>
                  ₦{order.total.toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
    gap: wp("4%"),
  },

  orderCard: {
    backgroundColor: "white",
    padding: wp("4%"),
    borderRadius: wp("4%"),
    gap: wp("4%"),
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  orderId: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
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

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },

  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemCount: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.secondaryColor,
  },

  total: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("8%"),
  },

  emptyIcon: {
    width: wp("25%"),
    height: wp("25%"),
    borderRadius: wp("12.5%"),
    backgroundColor: `${COLORS.primaryColor}15`,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: wp("5%"),
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 22,
    color: COLORS.textColor,
  },

  emptyText: {
    marginTop: wp("2%"),
    textAlign: "center",
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    color: COLORS.secondaryColor,
  },

  exploreButton: {
    marginTop: wp("7%"),
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: wp("8%"),
    paddingVertical: wp("4%"),
    borderRadius: wp("3%"),
  },

  exploreText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: "white",
  },
});
