import { useNetwork } from "@/context/NetworkContext";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OfflineScreen() {
  const { checkConnection } = useNetwork();
  const [isChecking, setIsChecking] = useState(false);

  const handleRetry = async () => {
    if (isChecking) return;

    setIsChecking(true);

    try {
      await checkConnection();
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="cloud-offline-outline"
            size={wp("18%")}
            color={COLORS.primaryColor}
          />
        </View>

        <Text style={styles.title}>You're Offline</Text>

        <Text style={styles.description}>
          It looks like you're not connected to the internet. Check your
          connection and try again.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleRetry}
          disabled={isChecking}
          activeOpacity={0.8}
        >
          {isChecking ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="refresh" size={19} color="#FFFFFF" />
              <Text style={styles.buttonText}>Try Again</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("10%"),
  },

  iconContainer: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("15%"),
    backgroundColor: `${COLORS.primaryColor}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: wp("7%"),
  },

  title: {
    fontFamily: "BricolageGrotesque-Bold",
    fontSize: 28,
    color: COLORS.textColor,
    marginBottom: wp("3%"),
  },

  description: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.secondaryColor,
    textAlign: "center",
    marginBottom: wp("8%"),
  },

  button: {
    minWidth: wp("40%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp("2%"),
    backgroundColor: COLORS.primaryColor,
    paddingVertical: wp("3.5%"),
    paddingHorizontal: wp("7%"),
    borderRadius: wp("3%"),
  },

  buttonText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
