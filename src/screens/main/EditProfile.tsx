import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
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

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your first and last name.",
      );
      return;
    }

    try {
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phone.trim(),
      });

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
                profile?.profileImage
                  ? { uri: profile.profileImage }
                  : require("../../../assets/images/profile-pic.png")
              }
              style={styles.profileImage}
            />

            <TouchableOpacity
              style={styles.editImageButton}
              onPress={() =>
                Alert.alert(
                  "Coming Soon",
                  "Profile photo upload will be connected to Cloudinary.",
                )
              }
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
});
