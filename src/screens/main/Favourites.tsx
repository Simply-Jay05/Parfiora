import ProductCard from "@/components/home/ProductCard";
import BackButton from "@/components/ui/BackButton";
import { useFavorites } from "@/context/FavoritesContext";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  const { favoriteIds, isLoading: favoritesLoading } = useFavorites();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products for favorites:", error);
        setErrorMessage("Couldn't load your favorites. Check your connection.");
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const favoritedProducts = allProducts.filter((product) =>
    favoriteIds.has(product.id),
  );

  const isLoading = favoritesLoading || productsLoading;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={COLORS.primaryColor} />
        </View>
      ) : errorMessage ? (
        <View style={styles.centerState}>
          <Ionicons name="cloud-offline-outline" size={40} color="#999" />
          <Text style={styles.emptyText}>{errorMessage}</Text>
        </View>
      ) : favoritedProducts.length === 0 ? (
        <View style={styles.centerState}>
          <Ionicons name="heart-outline" size={40} color="#999" />
          <Text style={styles.emptyText}>
            You haven&apos;t saved any favorites yet.{"\n"}Tap the heart on a
            parfait to add it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritedProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.content}
          renderItem={({ item }) => (
            <ProductCard
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          )}
        />
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
    paddingTop: wp("4%"),
    paddingBottom: wp("8%"),
    gap: wp("5%"),
  },
  row: {
    justifyContent: "space-between",
  },
  centerState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: wp("3%"),
    paddingHorizontal: wp("10%"),
  },
  emptyText: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
  },
});
