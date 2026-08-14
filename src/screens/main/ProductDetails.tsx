import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import Option from "@/components/ui/Option";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <TouchableOpacity style={styles.favoriteBtn}>
          <Ionicons name="heart" size={24} color={COLORS.secondaryColor} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.imageView}>
          <Image
            source={require("../../../assets/images/products/classic(1).png")}
            style={styles.image}
          />
        </View>

        <View style={styles.productInfo}>
          <View>
            <Text style={styles.name}>Classic Berry Parfait</Text>
            <Text style={styles.description}>
              Creamy yogurt layered with fresh berries, crunchy granola, and a
              touch of honey.
            </Text>
          </View>
          <Text style={styles.price}>₦4,500</Text>
        </View>

        {/* Quantity */}
        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() =>
                setQuantity((current) => (current > 1 ? current - 1 : 1))
              }
            >
              <Ionicons name="remove" size={20} color={COLORS.primaryColor} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => setQuantity((current) => current + 1)}
            >
              <Ionicons name="add" size={20} color={COLORS.primaryColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Size */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Choose a Size</Text>
            <Text style={styles.required}>Required</Text>
          </View>

          <View style={styles.options}>
            <Option label="Small" price="₦3,500" />
            <Option label="Medium" price="₦4,500" />
            <Option label="Large" price="₦5,500" />
          </View>
        </View>

        {/* Base */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Choose a Base</Text>
            <Text style={styles.required}>Required</Text>
          </View>

          <Option label="Greek Yogurt" />
          <Option label="Vanilla Yogurt" />
          <Option label="Coconut Yogurt" />
        </View>

        {/* Toppings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Toppings</Text>
            <Text style={styles.optional}>Optional</Text>
          </View>

          <Option label="Granola" />
          <Option label="Fresh Strawberries" />
          <Option label="Banana" />
          <Option label="Blueberries" />
          <Option label="Chocolate Chips" />
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <Text style={styles.optional}>
            Add any special request for this order
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            ₦{(4500 * quantity).toLocaleString()}
          </Text>
        </View>
        <Button title="Add to Cart" style={styles.addButton} />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("3%"),
  },
  favoriteBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: wp("5%"),
    paddingBottom: wp("30%"),
  },
  imageView: {
    width: "100%",
    height: wp("80%"),
    backgroundColor: "white",
    borderRadius: wp("4%"),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "92%",
    height: "92%",
    resizeMode: "stretch",
    borderRadius: wp("4%"),
  },
  productInfo: {
    marginTop: wp("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: wp("5%"),
  },
  name: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 22,
    color: COLORS.textColor,
  },
  description: {
    marginTop: wp("2%"),
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: "#777",
    maxWidth: wp("60%"),
  },
  price: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 18,
    color: COLORS.primaryColor,
  },
  quantitySection: {
    marginTop: wp("6%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
  },
  quantityBtn: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 17,
    color: COLORS.textColor,
  },
  section: {
    marginTop: wp("7%"),
    gap: wp("2%"),
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
  required: {
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: COLORS.primaryColor,
  },
  optional: {
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: "#888",
  },
  options: {
    flexDirection: "row",
    gap: wp("2%"),
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("4%"),
    backgroundColor: COLORS.bgColor,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },

  totalLabel: {
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: "#777",
  },

  totalPrice: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 19,
    color: COLORS.textColor,
  },

  addButton: {
    width: wp("48%"),
  },
});
