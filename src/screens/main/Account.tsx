import SettingsRow from "@/components/account/SettingsRow";
import { useAuth } from "@/context/AuthContext";
import { AppNav, TabNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

type AccountNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNav, "Account">,
  NativeStackNavigationProp<AppNav>
>;

export default function Account() {
  const navigation = useNavigation<AccountNavigationProp>();

  const { profile, logout } = useAuth();
  const fullName = profile?.fullName || "Parfiora User";

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: logout,
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={
            profile?.profileImage
              ? { uri: profile.profileImage }
              : require("../../../assets/images/profile-pic.png")
          }
          style={styles.profileImage}
        />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{fullName}</Text>

          <Text style={styles.userEmail}>
            {profile?.email ?? "No email available"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Account Options */}
      <View style={styles.options}>
        <SettingsRow
          title="My Orders"
          icon="receipt-outline"
          onPress={() => navigation.navigate("MyOrders")}
        />

        <SettingsRow
          title="Favourites"
          icon="heart-outline"
          onPress={() => navigation.navigate("Favourites")}
        />

        <SettingsRow
          title="Saved Locations"
          icon="location-outline"
          onPress={() => navigation.navigate("SavedLocations")}
        />

        <SettingsRow
          title="Settings"
          icon="settings-outline"
          onPress={() => navigation.navigate("Settings")}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={COLORS.bgSecColor} />

        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
    fontSize: 26,
    color: COLORS.textColor,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: wp("5%"),
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },

  profileImage: {
    width: wp("16%"),
    height: wp("16%"),
    borderRadius: wp("8%"),
    resizeMode: "cover",
  },

  userInfo: {
    flex: 1,
    marginLeft: wp("4%"),
  },

  userName: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 17,
    color: COLORS.textColor,
  },

  userEmail: {
    marginTop: wp("1%"),
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: "#888",
  },

  editButton: {
    paddingHorizontal: wp("3%"),
    paddingVertical: wp("2%"),
    borderRadius: wp("2%"),
    backgroundColor: COLORS.primaryColor,
  },

  editButtonText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 13,
    color: "#fff",
  },

  options: {
    marginTop: wp("4%"),
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp("2%"),
    marginTop: "auto",
    marginBottom: wp("6%"),
    paddingVertical: wp("4%"),
    borderRadius: wp("3%"),
    backgroundColor: COLORS.primaryColor,
    elevation: 1,
  },

  logoutText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 17,
    color: COLORS.bgSecColor,
  },
});
