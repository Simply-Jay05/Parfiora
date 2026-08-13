import OrderCard from "@/components/orders/OrderCard";
import BackButton from "@/components/ui/BackButton";
import { orders } from "@/data/dummyData";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type MyOrdersType = NavigationProp<AppNav, "MyOrders">;

export default function MyOrders() {
  const navigation = useNavigation<MyOrdersType>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <OrderCard
            id={item.id}
            shop={item.shop}
            date={item.date}
            status={item.status}
            total={item.total}
            items={item.items}
            onPress={() =>
              navigation.navigate("OrderDetails", { order: item } as never)
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: wp("5%"),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: wp("4%"),
  },
  headerTitle: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 26,
    color: COLORS.textColor,
  },
  content: {
    paddingTop: wp("3%"),
    paddingBottom: wp("8%"),
    gap: wp("4%"),
  },
});
