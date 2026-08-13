import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
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
  const [name, setName] = useState("Jay");
  const [email, setEmail] = useState("jay@example.com");
  const [phone, setPhone] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
              source={require("../../../assets/images/profile-pic.png")}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.changePhoto}>Change Profile Photo</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputView}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.primaryColor}
            />
          </View>

          <View style={styles.inputView}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputView}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <Button title="Save Changes" style={styles.button} />
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
  button: {
    marginBottom: wp("4%"),
  },
});
