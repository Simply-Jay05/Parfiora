import Button from "@/components/ui/Button";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderSuccessType = NavigationProp<AppNav, "OrderSuccess">;

export default function OrderSuccess() {
  const navigation = useNavigation<OrderSuccessType>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={wp("14%")} color="#fff" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Order Successful!</Text>

          <Text style={styles.description}>
            Your order has been placed successfully. You can track your order
            from My Orders.
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="View My Orders"
          onPress={() => {
            navigation.navigate("MyOrders");
          }}
        />

        <Button
          title="Continue Shopping"
          style={styles.continueButton}
          textColor={COLORS.secondaryColor}
          onPress={() => {
            navigation.navigate("Main", { screen: "Home" });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: wp("5%"),
    justifyContent: "space-between",
    paddingVertical: wp("8%"),
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: wp("6%"),
  },
  iconContainer: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("15%"),
    backgroundColor: COLORS.secondaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    gap: wp("3%"),
  },
  title: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 26,
    color: COLORS.textColor,
    textAlign: "center",
  },
  description: {
    fontFamily: "Manrope-Regular",
    fontSize: 15,
    color: COLORS.primaryColor,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: wp("5%"),
  },
  actions: {
    gap: wp("3%"),
  },
  continueButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.secondaryColor,
  },
});
