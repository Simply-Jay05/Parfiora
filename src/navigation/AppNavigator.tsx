import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

const AppStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
}
