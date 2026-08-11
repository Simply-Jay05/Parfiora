import CategorySection from "@/components/home/CategorySection";
import HomeHeader from "@/components/home/HomeHeader";
import NearbyShops from "@/components/home/NearbyShop";
import PopularMenu from "@/components/home/PopularMenu";
import PromotionBanner from "@/components/home/PromotionBanner";
import { COLORS } from "@/utils/colors";
import {
  ScrollView,
  StyleSheet
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
        <PopularMenu />
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
