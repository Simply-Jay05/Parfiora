import { createContext, ReactNode, useContext, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: string;
  image: any;
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
