import { db } from "@/config/firebase";
import { collection, getDocs, updateDoc } from "firebase/firestore";

export const updateFeaturedProducts = async () => {
  const featuredProducts = [
    "Almond",
    "Biscoff",
    "Chocolate",
    "Mango",
    "Mixed Berry",
    "Oreo Cookie",
    "Strawberry",
    "White Chocolate",
  ];

  try {
    console.log("Updating featured products...");

    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    for (const productDoc of snapshot.docs) {
      const product = productDoc.data();

      const isFeatured = featuredProducts.includes(product.name);

      await updateDoc(productDoc.ref, {
        featured: isFeatured,
      });

      console.log(`${product.name}: featured = ${isFeatured}`);
    }

    console.log("Featured products updated successfully!");
  } catch (error) {
    console.error("Error updating featured products:", error);
  }
};
