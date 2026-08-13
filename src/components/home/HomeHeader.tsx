import { useAuth } from "@/context/AuthContext";
import { homeUser } from "@/data/dummyData";
import { AppNav } from "@/types/types";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type HomeType = NavigationProp<AppNav, "Home">;

export default function HomeHeader() {
  const { signout } = useAuth();
  const handleSubmit = () => {
    signout();
  };
  const navigation = useNavigation<HomeType>();
  return (
    <View style={styles.container}>
      {/* User */}
      <View style={styles.userView}>
        <Image
          style={styles.profile}
          source={require("../../../assets/images/profile-pic.png")}
        />

        <View>
          <Text style={styles.greeting}>Good Morning!</Text>

          <Text style={styles.name}>{homeUser.name}</Text>
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
