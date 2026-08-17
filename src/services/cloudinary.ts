type UploadImageData = {
  base64: string;
  mimeType: string;
};

export const uploadImageToCloudinary = async (
  image: UploadImageData,
): Promise<string> => {
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

  console.log("Cloudinary response:", data);

  if (!response.ok) {
    throw new Error(data?.error?.message || "Cloudinary image upload failed.");
  }

  return data.secure_url;
};
