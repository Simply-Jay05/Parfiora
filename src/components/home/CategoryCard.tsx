import { COLORS } from "@/utils/colors";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type CategoryCardProps = {
  name: string;
  image: any;
  onPress?: () => void;
};

export default function CategoryCard({
  name,
  image,
  onPress,
}: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: wp("2%"),
  },

  image: {
    width: wp("16%"),
    height: wp("16%"),
    borderRadius: wp("8%"),
    resizeMode: "cover",
  },

  name: {
    fontFamily: "Manrope-Medium",
    fontSize: 14,
    color: COLORS.textColor,
  },
});
