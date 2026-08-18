import { db } from "@/config/firebase";
import { branchSeedData } from "@/data/branchSeedData";
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

export const seedBranches = async (
  onProgress?: (current: number, total: number, name: string) => void,
) => {
  const total = branchSeedData.length;

  for (let index = 0; index < branchSeedData.length; index++) {
    const branch = branchSeedData[index];
    onProgress?.(index + 1, total, branch.name);

    const branchRef = doc(db, "branches", branch.id);

    const existingBranch = await getDoc(branchRef);
    if (existingBranch.exists()) {
      console.log(`${branch.id} already exists. Skipping...`);
      continue;
    }

    console.log(`Uploading ${branch.name} image...`);
    const imageUrl = await uploadAsset(branch.image);

    await setDoc(branchRef, {
      id: branch.id,
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      hours: branch.hours,
      latitude: branch.latitude,
      longitude: branch.longitude,
      image: imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log(`${branch.name} seeded successfully.`);
  }

  return true;
};
