import { useAuth } from "@/context/AuthContext";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type HomeType = NavigationProp<AppNav, "Main">;

export default function HomeHeader() {
  const { profile } = useAuth();
  const fullName = profile?.fullName || "Parfiora User";
  const navigation = useNavigation<HomeType>();
  const [profileImage, setProfileImage] = useState<string | null>(
    profile?.profileImage ?? null,
  );
  return (
    <View style={styles.container}>
      {/* User */}
      <View style={styles.userView}>
        <Image
          style={styles.profile}
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../../assets/images/profile-pic.png")
          }
        />

        <View>
          <Text style={styles.greeting}>Good Morning!</Text>

          <Text style={styles.name}>{fullName}</Text>
        </View>
      </View>

      {/* Notification */}
      <TouchableOpacity
        style={styles.notifyBtn}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Ionicons
          name="notifications-sharp"
          size={20}
          color={COLORS.primaryColor}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userView: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },

  profile: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    resizeMode: "cover",
  },

  greeting: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: COLORS.textColor,
  },

  name: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 15,
    color: COLORS.textColor,
  },

  notifyBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
