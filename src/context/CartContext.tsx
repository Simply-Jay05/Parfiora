import { useAuth } from "@/context/AuthContext";
import { getUserCart, saveUserCart } from "@/services/cartService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
  isCartLoading: boolean;
  cartError: string | null;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, type: "increase" | "decrease") => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

const CART_SYNC_DEBOUNCE_MS = 600;

export const CartProvider = ({ children }: CartProviderProps) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  const hydratedForUid = useRef<string | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load this user's cart from Firestore whenever they log in/out.
  useEffect(() => {
    let isActive = true;

    if (syncTimer.current) {
      clearTimeout(syncTimer.current);
      syncTimer.current = null;
    }

    if (!user) {
      setCartItems([]);
      hydratedForUid.current = null;
      setCartError(null);
      return;
    }

    setIsCartLoading(true);
    setCartError(null);

    getUserCart(user.uid)
      .then((items) => {
        if (!isActive) return;
        setCartItems(items);
        hydratedForUid.current = user.uid;
      })
      .catch((error) => {
        console.error("Failed to load cart:", error);
        if (isActive) {
          setCartError(
            "We couldn't load your saved cart. Check your connection and try again.",
          );
        }
      })
      .finally(() => {
        if (isActive) setIsCartLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [user]);

  useEffect(() => {
    if (!user || hydratedForUid.current !== user.uid) {
      return;
    }

    if (syncTimer.current) {
      clearTimeout(syncTimer.current);
    }

    syncTimer.current = setTimeout(() => {
      saveUserCart(user.uid, cartItems).catch((error) => {
        console.error("Failed to sync cart:", error);
        setCartError(
          "Your cart couldn't be saved. It'll retry the next time you make a change.",
        );
      });
    }, CART_SYNC_DEBOUNCE_MS);

    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [cartItems, user]);

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
        isCartLoading,
        cartError,
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
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
