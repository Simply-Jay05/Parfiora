import { db } from "@/config/firebase";
import { Product } from "@/types/product";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products");

    const snapshot = await getDocs(productsRef);

    const products = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    })) as Product[];

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const productRef = doc(db, "products", id);

    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return null;
    }

    return {
      id: productSnap.id,
      ...productSnap.data(),
    } as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
