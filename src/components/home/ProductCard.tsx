import { useFavorites } from "@/context/FavoritesContext";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  showFavorite?: boolean;
};

type ProductCardNavigationProp = NavigationProp<AppNav, "ProductDetails">;

export default function ProductCard({
  id,
  name,
  price,
  image,
  showFavorite = true,
}: ProductCardProps) {
  const navigation = useNavigation<ProductCardNavigationProp>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(id);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetails", { id } as never)}
      >
        <View style={styles.imgView}>
          <Image style={styles.img} source={{ uri: image }} />

          {showFavorite && (
            <TouchableOpacity
              style={styles.favoriteBtn}
              onPress={(event) => {
                // Don't let the tap bubble up and open ProductDetails too.
                event.stopPropagation();
                toggleFavorite(id);
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={favorited ? "heart" : "heart-outline"}
                size={16}
                color={favorited ? COLORS.secondaryColor : COLORS.textColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>₦{price.toLocaleString()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "white",
    padding: wp("3%"),
    borderRadius: wp("3%"),
    elevation: 2,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  imgView: {
    width: "100%",
    height: wp("40%"),
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: wp("3%"),
  },
  favoriteBtn: {
    position: "absolute",
    top: wp("2%"),
    right: wp("2%"),
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    marginTop: wp("2%"),
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.textColor,
  },
  price: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-Regular",
    fontWeight: "bold",
    fontSize: 14,
    color: COLORS.secondaryColor,
  },
});
