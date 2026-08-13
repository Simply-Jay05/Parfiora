import Checkout from "@/screens/main/Checkout";
import EditProfile from "@/screens/main/EditProfile";
import Favorites from "@/screens/main/Favourites";
import MyOrders from "@/screens/main/MyOrders";
import Notifications from "@/screens/main/Notification";
import OrderDetails from "@/screens/main/OrderDetails";
import OrderSuccess from "@/screens/main/OrderSuccess";
import SavedLocations from "@/screens/main/SavedLocations";
import Settings from "@/screens/main/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

const AppStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Tab" component={TabNavigator} />
      <AppStack.Screen name="MyOrders" component={MyOrders} />
      <AppStack.Screen name="OrderDetails" component={OrderDetails} />
      <AppStack.Screen name="Checkout" component={Checkout} />
      <AppStack.Screen name="OrderSuccess" component={OrderSuccess} />
      <AppStack.Screen name="EditProfile" component={EditProfile} />
      <AppStack.Screen name="Favourites" component={Favorites} />
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen name="SavedLocations" component={SavedLocations} />
      <AppStack.Screen name="Notifications" component={Notifications} />
    </AppStack.Navigator>
  );
}
