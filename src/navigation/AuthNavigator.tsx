import Login from "@/screens/auth/Login";
import Otp from "@/screens/auth/Otp";
import Signup from "@/screens/auth/Signup";
import Welcome from "@/screens/auth/Welcome";
import { AuthNav } from "@/types/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator<AuthNav>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="OTP"
        component={Otp}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}
