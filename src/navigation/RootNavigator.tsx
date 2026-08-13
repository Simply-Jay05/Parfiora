import Splash from "@/screens/auth/Splash";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {
  // const { user, isLoading } = useAuth();
  const [user, setUser] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  if (isLoading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
