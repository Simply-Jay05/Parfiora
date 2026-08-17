import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { uploadImageToCloudinary } from "@/services/cloudinary";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
  const { user, profile, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState(profile?.firstName ?? "");
  const [lastName, setLastName] = useState(profile?.lastName ?? "");
  const [phone, setPhone] = useState(profile?.phoneNumber ?? "");
  const [profileImage, setProfileImage] = useState<string | null>(
    profile?.profileImage ?? null,
  );
  const [selectedImageData, setSelectedImageData] = useState<{
    base64: string;
    mimeType: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your first and last name.",
      );
      return;
    }
    setIsSaving(true);
    try {
      let uploadedImageUrl = profile?.profileImage ?? null;

      if (selectedImageData) {
        uploadedImageUrl = await uploadImageToCloudinary(selectedImageData);
      }
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phone.trim(),
        profileImage: uploadedImageUrl,
      });
      setProfileImage(uploadedImageUrl);
      Alert.alert(
        "Profile Updated",
        "Your profile information has been updated successfully.",
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert(
        "Update Failed",
        "Something went wrong while updating your profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handlePickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photos to change your profile picture.",
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      if (result.canceled) {
        return;
      }
      const asset = result.assets[0];
      if (!asset.base64) {
        throw new Error("Could not read the selected image.");
      }
      // Keep the URI for displaying the image
      setProfileImage(asset.uri);
      setSelectedImageData({
        base64: asset.base64,
        mimeType: asset.mimeType ?? "image/jpeg",
      });
    } catch (error) {
      console.error("Failed to select user image:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Personal Information</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Profile Image */}
        <View style={styles.profileSection}>
          <View style={styles.imgView}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../../assets/images/profile-pic.png")
              }
              style={styles.profileImage}
            />

            <TouchableOpacity
              style={styles.editImageButton}
              onPress={handlePickImage}
            >
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.changePhoto}>Change Profile Photo</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.nameRow}>
            <View style={styles.nameInput}>
              <Text style={styles.label}>First Name</Text>

              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.nameInput}>
              <Text style={styles.label}>Last Name</Text>

              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last name"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.inputView}>
            <Text style={styles.label}>Email Address</Text>

            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={user?.email ?? ""}
              editable={false}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.helperText}>
              Email changes are managed separately for security.
            </Text>
          </View>

          <View style={styles.inputView}>
            <Text style={styles.label}>Phone Number</Text>

            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      <Button title="Save Changes" style={styles.button} onPress={handleSave} />

      {isSaving && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={COLORS.primaryColor} />
            <Text style={styles.loadingText}>Saving your changes... </Text>
            {selectedImageData && (
              <Text style={styles.loadingSubText}>
                Uploading profile image{" "}
              </Text>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: wp("5%"),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: wp("4%"),
  },

  headerTitle: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 20,
    color: COLORS.textColor,
  },

  content: {
    paddingTop: wp("5%"),
    paddingBottom: wp("8%"),
    gap: wp("8%"),
  },

  profileSection: {
    alignItems: "center",
    gap: wp("3%"),
  },

  imgView: {
    position: "relative",
  },

  profileImage: {
    width: wp("28%"),
    height: wp("28%"),
    borderRadius: wp("14%"),
    resizeMode: "cover",
  },

  editImageButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.secondaryColor,
    justifyContent: "center",
    alignItems: "center",
  },

  changePhoto: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: COLORS.secondaryColor,
  },

  form: {
    gap: wp("5%"),
  },

  nameRow: {
    flexDirection: "row",
    gap: wp("3%"),
  },

  nameInput: {
    flex: 1,
    gap: wp("2%"),
  },

  inputView: {
    gap: wp("2%"),
  },

  label: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },

  input: {
    height: wp("15%"),
    paddingHorizontal: wp("4%"),
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
    borderRadius: 10,
    fontFamily: "Manrope-Regular",
    fontSize: 15,
    color: COLORS.textColor,
    backgroundColor: "white",
  },

  disabledInput: {
    backgroundColor: "#F3F3F3",
    color: "#888",
  },

  helperText: {
    fontFamily: "Manrope-Regular",
    fontSize: 11,
    color: "#888",
  },

  button: {
    marginBottom: wp("4%"),
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingBox: {
    width: wp("65%"),
    paddingVertical: wp("7%"),
    paddingHorizontal: wp("5%"),
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    gap: wp("3%"),
  },

  loadingText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: COLORS.textColor,
  },

  loadingSubText: {
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: "#888",
  },
});
