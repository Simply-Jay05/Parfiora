import { createContext, ReactNode, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: ImageSourcePropType;
};

type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
};

type CartContextType = {
  cartItems: CartItem[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartProduct) => {
    setCartItems((currentItems) => {
      // Check if the product is already in the cart
      const existingItem = currentItems.find((item) => item.id === product.id);

      // If it already exists, increase its quantity
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // Otherwise, add it as a new item
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("usecCart must be used inside CartProvider");
  }

  return context;
};
