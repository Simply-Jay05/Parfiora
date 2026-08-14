import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Button from "../ui/Button";

type EmptyCartProps = {
  onExplore: () => void;
};

export default function EmptyCart({ onExplore }: EmptyCartProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="cart-outline" size={60} color={COLORS.primaryColor} />
      </View>

      <Text style={styles.title}>Your cart is empty</Text>

      <Text style={styles.description}>
        Looks like you haven't added any delicious parfaits yet.
      </Text>

      <Button
        title="Explore Parfaits"
        onPress={onExplore}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("8%"),
  },

  iconContainer: {
    width: wp("25%"),
    height: wp("25%"),
    borderRadius: wp("12.5%"),
    backgroundColor: `${COLORS.primaryColor}15`,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: wp("5%"),
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 22,
    color: COLORS.textColor,
  },

  description: {
    marginTop: wp("2%"),
    textAlign: "center",
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 21,
    color: "#777",
  },

  button: {
    width: "100%",
    marginTop: wp("7%"),
  },
});
