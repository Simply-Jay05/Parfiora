import { useAuth } from "@/context/AuthContext";
import {
    addFavorite,
    removeFavorite,
    subscribeToFavorites,
} from "@/services/favoriteService";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type FavoritesContextType = {
  favoriteIds: Set<string>;
  isLoading: boolean;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Logged out: nothing to show, and definitely nothing to sync.
    if (!user) {
      setFavoriteIds(new Set());
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const unsubscribe = subscribeToFavorites(
      user.uid,
      (productIds) => {
        setFavoriteIds(new Set(productIds));
        setIsLoading(false);
      },
      () => setIsLoading(false),
    );

    return unsubscribe;
  }, [user]);

  const isFavorite = (productId: string) => favoriteIds.has(productId);

  const toggleFavorite = async (productId: string) => {
    if (!user) return;

    // Optimistic update so the heart icon responds instantly, not after a round trip.
    const wasFavorite = favoriteIds.has(productId);
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (wasFavorite) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });

    try {
      if (wasFavorite) {
        await removeFavorite(user.uid, productId);
      } else {
        await addFavorite(user.uid, productId);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Roll back on failure (e.g. offline) so the UI reflects reality.
      setFavoriteIds((current) => {
        const next = new Set(current);
        if (wasFavorite) {
          next.add(productId);
        } else {
          next.delete(productId);
        }
        return next;
      });
    }
  };

  const value = useMemo(
    () => ({ favoriteIds, isLoading, isFavorite, toggleFavorite }),
    [favoriteIds, isLoading],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
};
