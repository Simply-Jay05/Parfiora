import { createContext, ReactNode, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  size?: string;
  base?: string;
  toppings?: string[];
  extras?: string[];
};

export type Order = {
  id: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "Pending" | "Preparing" | "On the way" | "Deliverd";
  createdAt: string;
};

type OrderContextType = {
  orders: Order[];
  createOrder: (order: Omit<Order, "id" | "createdAt">) => void;
};

type OrderProviderProp = {
  children: ReactNode;
};

const orderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: OrderProviderProp) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = (order: Omit<Order, "id" | "createdAt">) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);
  };

  return (
    <orderContext.Provider value={{ orders, createOrder }}>
      {children}
    </orderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(orderContext);
  if (!context) {
    throw new Error("useOrders must be used inside an orderProvider");
  }
  return context;
};
