import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/services/productService";
import { Product } from "@/types/product";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type ProductDetailsParams = {
  ProductDetails: {
    id: string;
  };
};
type ProductDetailsType = NavigationProp<AppNav, "ProductDetails">;

const sizes = [
  { name: "Small", price: 3500 },
  { name: "Medium", price: 4500 },
  { name: "Large", price: 5500 },
];
const bases = ["Greek Yogurt", "Vanilla Yogurt", "Coconut Yogurt"];
const toppings = [
  "Granola",
  "Fresh Strawberries",
  "Banana",
  "Blueberries",
  "Chocolate Chips",
];
const extras = [
  { name: "Extra Granola", price: 500 },
  { name: "Honey Drizzle", price: 300 },
  { name: "Peanut Butter", price: 500 },
];

export default function ProductDetails() {
  const navigation = useNavigation<ProductDetailsType>();
  const route = useRoute<RouteProp<ProductDetailsParams, "ProductDetails">>();

  const { id } = route.params;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedBase, setSelectedBase] = useState("Greek Yogurt");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleTopping = (topping: string) => {
    setSelectedToppings((current) => {
      if (current.includes(topping)) {
        return current.filter((item) => item !== topping);
      }
      return [...current, topping];
    });
  };

  const toggleExtras = (extra: string) => {
    setSelectedExtras((current) => {
      if (current.includes(extra)) {
        return current.filter((item) => item !== extra);
      }
      return [...current, extra];
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryColor} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  const selectedSizeData = sizes.find((size) => size.name === selectedSize);
  const basePrice = selectedSizeData?.price ?? product.price;
  const extrasTotal = selectedExtras.reduce((total, extraName) => {
    const extra = extras.find((item) => item.name === extraName);
    return total + (extra?.price ?? 0);
  }, 0);
  const unitPrice = basePrice + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: unitPrice,
      image: product.image,
      quantity,
      size: selectedSize,
      base: selectedBase,
      toppings: selectedToppings,
      extras: selectedExtras,
      specialInstructions,
    });

    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart.`,
      [
        {
          text: "Continue Shopping",
          style: "cancel",
        },
        {
          text: "View Cart",
          onPress: () =>
            navigation.navigate("Main", {
              screen: "Orders",
            }),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => setIsFavorite((current) => !current)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={COLORS.secondaryColor}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.imageView}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.productInfo}>
          <View>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          <Text style={styles.price}>₦{product.price.toLocaleString()}</Text>
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

          <View style={styles.sizeOptions}>
            {sizes.map((size) => {
              const isSelected = selectedSize === size.name;
              return (
                <TouchableOpacity
                  key={size.name}
                  style={[
                    styles.sizeOption,
                    isSelected && styles.selectedSizeOption,
                  ]}
                  onPress={() => setSelectedSize(size.name)}
                >
                  <Text
                    style={[
                      styles.sizeName,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {size.name}
                  </Text>

                  <Text
                    style={[
                      styles.sizePrice,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    ₦{size.price.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Base */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Choose a Base</Text>
            <Text style={styles.required}>Required</Text>
          </View>

          {bases.map((base) => {
            const isSelected = selectedBase === base;
            return (
              <TouchableOpacity
                key={base}
                style={styles.option}
                onPress={() => setSelectedBase(base)}
              >
                <Text style={styles.optionText}>{base}</Text>
                <Ionicons
                  name={isSelected ? "radio-button-on" : "radio-button-off"}
                  size={21}
                  color={isSelected ? COLORS.primaryColor : "#BDBDBD"}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Toppings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Toppings</Text>
            <Text style={styles.optional}>Optional</Text>
          </View>

          {toppings.map((topping) => {
            const isSelected = selectedToppings.includes(topping);
            return (
              <TouchableOpacity
                key={topping}
                style={styles.option}
                onPress={() => toggleTopping(topping)}
              >
                <Text style={styles.optionText}>{topping}</Text>
                <Ionicons
                  name={isSelected ? "checkbox" : "square-outline"}
                  size={21}
                  color={isSelected ? COLORS.primaryColor : "#BDBDBD"}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Extras */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Extras</Text>
            <Text style={styles.optional}>Optional</Text>
          </View>

          {extras.map((extra) => {
            const isSelected = selectedExtras.includes(extra.name);
            return (
              <TouchableOpacity
                key={extra.name}
                style={styles.option}
                onPress={() => toggleExtras(extra.name)}
              >
                <View>
                  <Text style={styles.optionText}>{extra.name}</Text>
                  <Text style={styles.extraPrice}>
                    + ₦{extra.price.toLocaleString()}
                  </Text>
                </View>

                <Ionicons
                  name={isSelected ? "checkbox" : "square-outline"}
                  size={21}
                  color={isSelected ? COLORS.primaryColor : "#BDBDBD"}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <Text style={styles.optional}>
            Add any special request for this order
          </Text>

          <TextInput
            style={styles.instructionsInput}
            placeholder="e.g. Please add extra strawberries..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>₦{totalPrice.toLocaleString()}</Text>
        </View>
        <Button
          title="Add to Cart"
          style={styles.addButton}
          onPress={handleAddToCart}
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
  sizeOptions: {
    flexDirection: "row",
    gap: wp("2%"),
  },
  sizeOption: {
    flex: 1,
    paddingVertical: wp("3%"),
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: wp("3%"),
    alignItems: "center",
  },
  selectedSizeOption: {
    borderColor: COLORS.primaryColor,
    backgroundColor: `${COLORS.primaryColor}15`,
  },
  sizeName: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.textColor,
  },
  sizePrice: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: COLORS.secondaryColor,
  },
  selectedOptionText: {
    color: COLORS.primaryColor,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: wp("3%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayAccent,
  },
  optionText: {
    flex: 1,
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    color: COLORS.textColor,
  },
  extraPrice: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.secondaryColor,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bgColor,
  },
  errorText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },
  instructionsInput: {
    minHeight: wp("25%"),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    color: COLORS.textColor,
  },
});
