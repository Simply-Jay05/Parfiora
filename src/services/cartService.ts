import { db } from "@/config/firebase";
import {
    deleteDoc,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

export type FirestoreCartItem = {
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

export const getUserCart = async (
  uid: string,
): Promise<FirestoreCartItem[]> => {
  try {
    const cartRef = doc(db, "carts", uid);
    const snapshot = await getDoc(cartRef);

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.data();
    return (data.items as FirestoreCartItem[]) ?? [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const saveUserCart = async (
  uid: string,
  items: FirestoreCartItem[],
): Promise<void> => {
  try {
    const cartRef = doc(db, "carts", uid);
    await setDoc(cartRef, { items, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error("Error saving cart:", error);
    throw error;
  }
};

export const clearUserCart = async (uid: string): Promise<void> => {
  try {
    const cartRef = doc(db, "carts", uid);
    await deleteDoc(cartRef);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};
