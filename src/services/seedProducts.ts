import { db } from "@/config/firebase";
import { productSeedData } from "@/data/productSeedData";
import { Asset } from "expo-asset";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { uploadLocalImageToCloudinary } from "./cloudinary";

const getLocalAssetUri = async (assetModule: number): Promise<string> => {
  const asset = Asset.fromModule(assetModule);
  await asset.downloadAsync();
  if (!asset.localUri) {
    throw new Error("Could not get local image URI.");
  }
  return asset.localUri;
};

const uploadAsset = async (assetModule: number): Promise<string> => {
  const localUri = await getLocalAssetUri(assetModule);
  return uploadLocalImageToCloudinary(localUri, "image/png");
};

export const seedProducts = async (
  onProgress?: (current: number, total: number, name: string) => void,
) => {
  const total = productSeedData.length;
  for (let index = 0; index < productSeedData.length; index++) {
    const product = productSeedData[index];
    onProgress?.(index + 1, total, product.name);
    const productRef = doc(db, "products", product.id);

    // Prevent uploading duplicates if this product was already successfully seeded.
    const existingProduct = await getDoc(productRef);
    if (existingProduct.exists()) {
      console.log(`${product.id} already exists. Skipping...`);
      continue;
    }
    console.log(`Uploading ${product.name} main image...`);
    const imageUrl = await uploadAsset(product.mainImage);
    console.log(`Uploading ${product.name} gallery images...`);

    const galleryImages = await Promise.all(
      product.galleryImages.map((image) => uploadAsset(image)),
    );

    await setDoc(productRef, {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: imageUrl,
      galleryImages,
      featured: product.featured,
      available: true,
      shopId: null,
      rating: 0,
      reviewCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`${product.name} seeded successfully.`);
  }
  return true;
};
