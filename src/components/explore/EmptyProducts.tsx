import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type EmptyProductsProps = {
  search: string;
  category: string;
};

export default function EmptyProducts({
  search,
  category,
}: EmptyProductsProps) {
  const message = search
    ? `We couldn't find any parfait matching "${search}".`
    : `We couldn't find any ${category} parfaits yet.`;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="search-outline"
          size={wp("12%")}
          color={COLORS.primaryColor}
        />
      </View>

      <Text style={styles.title}>No Products Found</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subMessage}>
        Try searching for something else or choose another category.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("8%"),
    paddingBottom: wp("15%"),
  },
  iconContainer: {
    width: wp("24%"),
    height: wp("24%"),
    borderRadius: wp("12%"),
    backgroundColor: "#FFF3F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: wp("5%"),
  },
  title: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 22,
    color: COLORS.textColor,
    textAlign: "center",
  },
  message: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.secondaryColor,
    textAlign: "center",
    marginTop: wp("3%"),
  },
  subMessage: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginTop: wp("2%"),
    lineHeight: 20,
  },
});
