import OfflineScreen from "@/components/ui/OfflineScreen";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { NetworkProvider, useNetwork } from "@/context/NetworkContext";
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

  function AppContent() {
    const { isConnected } = useNetwork();

    if (isConnected === false) {
      return <OfflineScreen />;
    }

    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <RootNavigator />
      </>
    );
  }

  return (
    <NetworkProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <FavoritesProvider>
              <PaystackProvider
                publicKey={process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY ?? ""}
              >
                <AppContent />
              </PaystackProvider>
            </FavoritesProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </NetworkProvider>
  );
}
