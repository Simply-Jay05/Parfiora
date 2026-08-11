import CategorySection from "@/components/home/CategorySection";
import HomeHeader from "@/components/home/HomeHeader";
import NearbyShops from "@/components/home/NearbyShop";
import ProductCard from "@/components/home/ProductCard";
import PromotionBanner from "@/components/home/PromotionBanner";
import { COLORS } from "@/utils/colors";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <HomeHeader />

        {/* Promotion Banner */}
        <PromotionBanner />

        {/* Categories */}
        <CategorySection />

        {/* NearbyShop */}
        <NearbyShops />

        {/* Popular Menu */}
        <View style={styles.popularView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Popular Menu</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <ProductCard />
          {/* <View>
            <View style={styles.productCard}>
              <Image
                style={styles.productImg}
                source={require("../../../assets/images/products/classic(1).png")}
              />
              <Text style={styles.productName}>Classic Brew</Text>
              <Text style={styles.price}>₦3,500</Text>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    backgroundColor: COLORS.bgColor,
  },

  wrapper: {
    gap: wp("5%"),
  },

  popularView: {
    gap: wp("4%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 18,
  },
  viewAll: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.primaryColor,
  },
  productView: {},
  productCard: {
    backgroundColor: "white",
  },
  productImg: {
    width: wp("40%"),
    height: wp("40%"),
    borderRadius: wp("2%"),
  },
  productName: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
  },
  price: {
    fontFamily: "Manrope-Regular",
    color: COLORS.goldAccent,
    // fontSize: 18,
  },
});
