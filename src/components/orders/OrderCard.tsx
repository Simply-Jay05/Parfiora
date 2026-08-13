import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type OrderCardProps = {
  id: string;
  shop: string;
  date: string;
  status: string;
  total: number;
  items: any[];
  onPress?: () => void;
};

export default function OrderCard({
  id,
  shop,
  date,
  status,
  total,
  items,
  onPress,
}: OrderCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.top}>
        <View>
          <Text style={styles.shop}>{shop}</Text>
          <Text style={styles.orderId}>{id}</Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color={COLORS.primaryColor}
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.dot} />
        <Text style={styles.date}>
          {items.length} {items.length === 1 ? "item" : "items"}
        </Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.total}>₦{total.toLocaleString()}</Text>

        <Text
          style={[
            styles.status,
            status === "Delivered" && styles.delivered,
            status === "Processing" && styles.processing,
            status === "Cancelled" && styles.cancelled,
          ]}
        >
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: wp("4%"),
    borderRadius: wp("4%"),
    gap: wp("3%"),
    elevation: 1,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shop: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },
  orderId: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.primaryColor,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  date: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.textColor,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primaryColor,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.secondaryColor,
  },
  status: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 13,
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
});
