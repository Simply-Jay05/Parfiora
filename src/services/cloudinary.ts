import { File } from "expo-file-system";

type UploadImageData = {
  base64: string;
  mimeType: string;
};

const uploadToCloudinary = async (image: UploadImageData): Promise<string> => {
  const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing.");
  }

  const formData = new FormData();
  const dataUri = `data:${image.mimeType};base64,${image.base64}`;

  formData.append("file", dataUri);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.log("Cloudinary response:", data);

    throw new Error(data?.error?.message || "Cloudinary image upload failed.");
  }

  return data.secure_url;
};

// Existing profile-image upload
export const uploadImageToCloudinary = async (
  image: UploadImageData,
): Promise<string> => {
  return uploadToCloudinary(image);
};

// New reusable local-image upload
export const uploadLocalImageToCloudinary = async (
  uri: string,
  mimeType: string = "image/png",
): Promise<string> => {
  const file = new File(uri);

  const base64 = await file.base64();

  return uploadImageToCloudinary({
    base64,
    mimeType,
  });
};
