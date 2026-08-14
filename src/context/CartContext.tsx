import { createContext, ReactNode, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

type CartItem = CartProduct & {
  quantity: number;
};

type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  quantity?: number;
  size?: string;
  base?: string;
  toppings?: string[];
  extras?: string[];
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, type: "increase" | "decrease") => void;
  clearCart: () => void;
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
      const existingItem = currentItems.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.base === product.base &&
          JSON.stringify(item.toppings) === JSON.stringify(product.toppings) &&
          JSON.stringify(item.extras) === JSON.stringify(product.extras),
      );

      // If it already exists, increase its quantity
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === existingItem.id &&
          item.size === existingItem.size &&
          item.base === existingItem.base &&
          JSON.stringify(item.toppings) ===
            JSON.stringify(existingItem.toppings) &&
          JSON.stringify(item.extras) === JSON.stringify(existingItem.extras)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // Otherwise, add it as a new item
      return [...currentItems, { ...product, quantity: product.quantity ?? 1 }];
    });
  };

  const removeFromCart = (itemToRemove: CartItem) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.id === itemToRemove.id &&
            item.size === itemToRemove.size &&
            item.base === itemToRemove.base &&
            JSON.stringify(item.toppings) ===
              JSON.stringify(itemToRemove.toppings) &&
            JSON.stringify(item.extras) === JSON.stringify(itemToRemove.extras)
          ),
      ),
    );
  };

  const updateQuantity = (
    itemToUpdate: CartItem,
    type: "increase" | "decrease",
  ) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        const isSameItem =
          item.id === itemToUpdate.id &&
          item.size === itemToUpdate.size &&
          item.base === itemToUpdate.base &&
          JSON.stringify(item.toppings) ===
            JSON.stringify(itemToUpdate.toppings) &&
          JSON.stringify(item.extras) === JSON.stringify(itemToUpdate.extras);

        if (!isSameItem) {
          return item;
        }

        return {
          ...item,
          quantity:
            type === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
        };
      }),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
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
