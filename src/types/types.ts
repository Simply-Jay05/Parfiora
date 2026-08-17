import { NavigatorScreenParams } from "@react-navigation/native";

export type AppNav = {
  Main: NavigatorScreenParams<TabNav>;
  ProductDetails: {
    id: string;
  };
  MyOrders: undefined;
  EditProfile: undefined;
  Favourites: undefined;
  Settings: undefined;
  SavedLocations: undefined;
  Notifications: undefined;
  OrderDetails: {
    orderId: string;
  };
  Checkout: undefined;
  OrderSuccess: undefined;
  SeedProducts: undefined;
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
