import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type NearbyShopCardProps = {
  name: string;
  location: string;
  distance: string;
  rating: number;
  image: any;
};

export default function NearbyShopCard({
  name,
  location,
  distance,
  rating,
  image,
}: NearbyShopCardProps) {
  return (
    <View style={styles.card}>
      {/* Shop Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />

        {/* Rating */}
        <View style={styles.rating}>
          <Ionicons name="star" size={10} color="#F5A623" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      {/* Shop Information */}
      <TouchableOpacity>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {location}
        </Text>
      </TouchableOpacity>

      <View style={styles.distanceView}>
        <View style={styles.dot} />
        <Text style={styles.distance}>{distance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp("38%"),
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: wp("32%"),
    borderRadius: wp("3%"),
    resizeMode: "cover",
  },

  rating: {
    position: "absolute",
    top: wp("2%"),
    left: wp("2%"),
    flexDirection: "row",
    alignItems: "center",
    gap: wp("1%"),
    paddingHorizontal: wp("2%"),
    paddingVertical: wp("1%"),
    borderRadius: wp("3%"),
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  ratingText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 10,
    color: "white",
  },

  name: {
    marginTop: wp("2%"),
    fontFamily: "Manrope-SemiBold",
    fontSize: 13,
    color: COLORS.textColor,
  },

  location: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-Regular",
    fontSize: 11,
    color: "#777",
  },

  distanceView: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("1%"),
    marginTop: wp("1%"),
  },

  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.secondaryColor,
  },

  distance: {
    fontFamily: "Manrope-Regular",
    fontSize: 10,
    color: COLORS.textColor,
  },
});
