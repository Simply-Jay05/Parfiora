import { nearbyShops } from "@/data/dummyData";
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

  shops: {
    gap: wp("4%"),
  },
});
