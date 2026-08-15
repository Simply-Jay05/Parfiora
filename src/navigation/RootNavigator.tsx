import { useAuth } from "@/context/AuthContext";
import Splash from "@/screens/auth/Splash";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
