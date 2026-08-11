import { nearbyShops } from "@/data/homeData";
import { COLORS } from "@/utils/colors";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import NearbyShopCard from "./NearbyShopCard";

export default function NearbyShops() {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Shops</Text>

        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Shops */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.shops}
      >
        {nearbyShops.map((shop) => (
          <NearbyShopCard
            key={shop.id}
            name={shop.name}
            location={shop.location}
            distance={shop.distance}
            rating={shop.rating}
            image={shop.image}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: wp("6%"),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: wp("4%"),
  },

  title: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 18,
  },

  viewAll: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.primaryColor,
  },

  shops: {
    gap: wp("4%"),
  },
});
