import { createContext, ReactNode, useContext, useState } from "react";

type CartProduct = {
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

type CartItem = CartProduct & {
  quantity: number;
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
      const existingItem = currentItems.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.base === product.base &&
          JSON.stringify(item.toppings) === JSON.stringify(product.toppings) &&
          JSON.stringify(item.extras) === JSON.stringify(product.extras) &&
          item.specialInstructions === product.specialInstructions,
      );

      if (existingItem) {
        return currentItems.map((item) => {
          const isSameItem =
            item.id === product.id &&
            item.size === product.size &&
            item.base === product.base &&
            JSON.stringify(item.toppings) ===
              JSON.stringify(product.toppings) &&
            JSON.stringify(item.extras) === JSON.stringify(product.extras) &&
            item.specialInstructions === product.specialInstructions;

          return isSameItem
            ? { ...item, quantity: item.quantity + product.quantity }
            : item;
        });
      }

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
            JSON.stringify(item.extras) ===
              JSON.stringify(itemToRemove.extras) &&
            item.specialInstructions === itemToRemove.specialInstructions
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
          JSON.stringify(item.extras) === JSON.stringify(itemToUpdate.extras) &&
          item.specialInstructions === itemToUpdate.specialInstructions;

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
