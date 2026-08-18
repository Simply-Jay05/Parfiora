import { db } from "@/config/firebase";
import {
    arrayRemove,
    arrayUnion,
    doc,
    onSnapshot,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

// One doc per user: favorites/{uid} = { productIds: string[] }
const favoritesDocRef = (uid: string) => doc(db, "favorites", uid);

export const subscribeToFavorites = (
  uid: string,
  onChange: (productIds: string[]) => void,
  onError?: (error: unknown) => void,
) => {
  return onSnapshot(
    favoritesDocRef(uid),
    (snapshot) => {
      const data = snapshot.data();
      onChange(data?.productIds ?? []);
    },
    (error) => {
      console.error("Error listening to favorites:", error);
      onError?.(error);
    },
  );
};

export const addFavorite = async (uid: string, productId: string) => {
  await setDoc(
    favoritesDocRef(uid),
    {
      productIds: arrayUnion(productId),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export const removeFavorite = async (uid: string, productId: string) => {
  await setDoc(
    favoritesDocRef(uid),
    {
      productIds: arrayRemove(productId),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};
