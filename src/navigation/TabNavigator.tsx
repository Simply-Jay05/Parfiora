import { useCart } from "@/context/CartContext";
import Account from "@/screens/main/Account";
import Explore from "@/screens/main/Explore";
import Home from "@/screens/main/Home";
import Orders from "@/screens/main/Orders";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondaryColor,
        tabBarInactiveTintColor: "#757272",
        tabBarLabelStyle: {
          fontFamily: "Manrope-SemiBold",
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: "white",
          // borderTopWidth: 0,
          // elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.cartIcon}>
              <Ionicons name="cart" size={size} color={color} />

              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  cartIcon: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -12,
    minWidth: 17,
    height: 17,
    borderRadius: 10,
    backgroundColor: COLORS.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontFamily: "Manrope-SemiBold",
  },
});
