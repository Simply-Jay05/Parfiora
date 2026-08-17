import { categories } from "@/data/dummyData";
import { AppNav, TabNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CategoryCard from "./CategoryCard";

type CategoryNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNav, "Home">,
  NativeStackNavigationProp<AppNav>
>;

export default function CategorySection() {
  const navigation = useNavigation<CategoryNavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>

        <View style={{ width: wp("10%") }}></View>
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
            onPress={() =>
              navigation.navigate("Explore", { category: category.name })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp("4%"),
    backgroundColor: "white",
    padding: wp("4%"),
    borderRadius: wp("4%"),
    elevation: 2,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 20,
    color: COLORS.textColor,
  },

  viewAll: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.secondaryColor,
  },

  categories: {
    gap: wp("5%"),
  },
});
