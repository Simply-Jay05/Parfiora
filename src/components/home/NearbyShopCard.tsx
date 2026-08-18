import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type NearbyShopCardProps = {
  name: string;
  location: string;
  distance: string;
  latitude: number;
  longitude: number;
  image: string;
};

export default function NearbyShopCard({
  name,
  location,
  distance,
  latitude,
  longitude,
  image,
}: NearbyShopCardProps) {
  const openInMaps = () => {
    const label = encodeURIComponent(name);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });

    Linking.openURL(url as string).catch(() => {
      // Fallback if the native maps scheme fails to open (e.g. no maps app installed)
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      );
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openInMaps}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.location} numberOfLines={1}>
        {location}
      </Text>

      {!!distance && (
        <View style={styles.distanceView}>
          <Ionicons name="navigate" size={10} color={COLORS.secondaryColor} />
          <Text style={styles.distance}>{distance} away</Text>
        </View>
      )}
    </TouchableOpacity>
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

  distance: {
    fontFamily: "Manrope-Regular",
    fontSize: 10,
    color: COLORS.textColor,
  },
});
