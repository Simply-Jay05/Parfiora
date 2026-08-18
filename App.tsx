import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { OrderProvider } from "@/context/OrderContext";
import RootNavigator from "@/navigation/RootNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { PaystackProvider } from "react-native-paystack-webview";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "BricolageGrotesque-Bold": require("./assets/fonts/BricolageGrotesque-Bold.ttf"),
    "BricolageGrotesque-SemiBold": require("./assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    "Caveat-Regular": require("./assets/fonts/Caveat-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <PaystackProvider
      publicKey={process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY ?? ""}
      currency="NGN"
      debug={true}
    >
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <OrderProvider>
              <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
              ></StatusBar>
              <RootNavigator />
            </OrderProvider>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </PaystackProvider>
  );
}
