import { NavigatorScreenParams } from "@react-navigation/native";
import { ImageSourcePropType } from "react-native";

export type AppNav = {
  Main: NavigatorScreenParams<TabNav>;
  ProductDetails: {
    id: string;
    name: string;
    price: number;
    image: ImageSourcePropType;
  };
  MyOrders: undefined;
  EditProfile: undefined;
  Favourites: undefined;
  Settings: undefined;
  SavedLocations: undefined;
  Notifications: undefined;
  OrderDetails: {
    // We'll add the actual order data later
    orderId: string;
  };
  Checkout: undefined;
  OrderSuccess: undefined;
};

export type AuthNav = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  OTP: undefined;
};

export type TabNav = {
  Home: undefined;
  Explore: { category?: string } | undefined;
  Orders: undefined;
  Account: undefined;
};
