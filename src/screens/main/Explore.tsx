import EmptyProducts from "@/components/explore/EmptyProducts";
import ProductCard from "@/components/home/ProductCard";
import { popularMenu } from "@/data/dummyData";
import { TabNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type ExploreRouteProp = RouteProp<TabNav, "Explore">;

export default function Explore() {
  const route = useRoute<ExploreRouteProp>();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    route.params?.category ?? "All",
  );

  useEffect(() => {
    if (route.params?.category) {
      setSelectedCategory(route.params.category);
    }
  }, [route.params?.category]);

  const categories = [
    "All",
    "Classic",
    "Fruit",
    "Chocolate",
    "Tropical",
    "Special",
  ];

  const filterredProducts = popularMenu.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>Find your favorite parfait 😋</Text>

      <View style={styles.searchView}>
        <Ionicons name="search" size={22} color={COLORS.secondaryColor} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for parfaits.."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* categories */}
      <View>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categories}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={[
                  styles.category,
                  selectedCategory === item && styles.activeCategory,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item && styles.activeCategoryText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* products */}
      {filterredProducts.length > 0 ? (
        <FlatList
          data={filterredProducts}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.products}
          showsVerticalScrollIndicator={false}
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
      ) : (
        <EmptyProducts search={search} category={selectedCategory} />
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
  title: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 28,
    color: COLORS.textColor,
  },
  subtitle: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 18,
    color: COLORS.secondaryColor,
    marginTop: wp("1%"),
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: wp("3%"),
    paddingHorizontal: wp("4%"),
    marginTop: wp("6%"), //
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
    gap: wp("2%"),
  },
  searchInput: {
    flex: 1,
    paddingVertical: wp("4%"),
    fontFamily: "Manrope-regular",
    color: COLORS.textColor,
    fontSize: 16,
  },
  categories: {
    gap: wp("3%"),
    paddingVertical: wp("5%"),
  },
  category: {
    backgroundColor: "white",
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("2%"),
    borderRadius: wp("5%"),
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
  },
  activeCategory: {
    backgroundColor: COLORS.primaryColor,
  },
  categoryText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 13,
    color: COLORS.primaryColor,
  },
  activeCategoryText: {
    color: "white",
  },
  products: {
    paddingBottom: wp("10%"),
  },
  row: {
    justifyContent: "space-between",
    marginBottom: wp("5%"),
  },
});
