import { categories } from "@/data/homeData";
import { COLORS } from "@/utils/colors";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>

        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            image={category.image}
          />
        ))}
      </ScrollView>
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
    fontSize: 18,
    color: COLORS.textColor,
  },

  viewAll: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.primaryColor,
  },

  categories: {
    gap: wp("5%"),
  },
});
