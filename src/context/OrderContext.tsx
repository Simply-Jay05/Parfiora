import { useAuth } from "@/context/AuthContext";
import {
  createOrder as createOrderInFirestore,
  OrderStatus,
  subscribeToUserOrders,
} from "@/services/orderService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  base?: string;
  toppings?: string[];
  extras?: string[];
  specialInstructions?: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentReference?: string;
  createdAt: string;
};

type NewOrderInput = Omit<Order, "id" | "createdAt">;

type OrderContextType = {
  orders: Order[];
  isOrdersLoading: boolean;
  ordersError: string | null;
  createOrder: (order: NewOrderInput) => Promise<string>;
};

type OrderProviderProp = {
  children: ReactNode;
};

const orderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: OrderProviderProp) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setOrdersError(null);
      return;
    }

    setIsOrdersLoading(true);
    setOrdersError(null);

    const unsubscribe = subscribeToUserOrders(
      user.uid,
      (firestoreOrders) => {
        setOrders(firestoreOrders);
        setIsOrdersLoading(false);
      },
      () => {
        setOrdersError(
          "We couldn't load your orders. Check your connection and try again.",
        );
        setIsOrdersLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  const createOrder = async (order: NewOrderInput): Promise<string> => {
    if (!user) {
      throw new Error("You must be signed in to place an order.");
    }

    // Local list updates automatically via the onSnapshot listener above
    // once the write lands, so we just forward it to Firestore here.
    return createOrderInFirestore(user.uid, order);
  };

  return (
    <orderContext.Provider
      value={{ orders, isOrdersLoading, ordersError, createOrder }}
    >
      {children}
    </orderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(orderContext);
  if (!context) {
    throw new Error("useOrders must be used inside an OrderProvider");
  }
  return context;
};
