import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
  size?: string;
  base?: string;
  toppings?: string[];
  extras?: string[];
  specialInstructions?: string;
  onDelete?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
};

export default function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  size,
  base,
  toppings,
  extras,
  onDelete,
  onIncrease,
  onDecrease,
}: CartItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.topView}>
          <View style={styles.details}>
            <Text style={styles.name} numberOfLines={2}>
              {name}
            </Text>

            {!!size || !!base ? (
              <Text style={styles.customization}>
                {[size, base].filter(Boolean).join(" • ")}
              </Text>
            ) : null}

            {toppings && toppings.length > 0 && (
              <Text style={styles.customization} numberOfLines={2}>
                {toppings.join(", ")}
              </Text>
            )}

            {extras && extras.length > 0 && (
              <Text style={styles.customization} numberOfLines={2}>
                + {extras.join(", ")}
              </Text>
            )}

            <Text style={styles.price}>₦{price.toLocaleString()}</Text>
          </View>

          <View>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Ionicons name="trash-outline" size={22} color="#D9534F" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.quantityView}>
          <TouchableOpacity style={styles.quantityBtn} onPress={onDecrease}>
            <Ionicons name="remove" size={22} color="white" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityBtn} onPress={onIncrease}>
            <Ionicons name="add" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.bgSecColor,
    padding: wp("4%"),
    borderRadius: wp("4"),
    gap: wp("6%"),
    elevation: 2,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: {
    width: wp("22%"),
    height: wp("22%"),
    borderRadius: wp("3%"),
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    gap: wp("2%"),
  },
  details: {
    flex: 1,
    minWidth: 0,
    gap: wp("1%"),
  },
  name: {
    fontFamily: "Manrope-Semibold",
    fontSize: 17,
    color: COLORS.textColor,
  },
  price: {
    fontFamily: "Manrope-Semibold",
    fontSize: 16,
    color: COLORS.secondaryColor,
    marginTop: wp("1"), //
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  quantityView: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
  },
  quantityBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondaryColor,
  },
  quantity: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
  },
  deleteButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  customization: {
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: COLORS.secondaryColor,
  },
});
