import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";
import { COLORS } from "@/utils/colors";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ProductCard from "./ProductCard";

export default function PopularMenu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const popularProducts = data.filter(
          (product) => product.featured === true,
        );
        setProducts(popularProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Menu</Text>

        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp("4%"),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 20,
  },

  viewAll: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.secondaryColor,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: wp("5%"),
  },
});
