import SettingsRow from "@/components/account/SettingsRow";
import BackButton from "@/components/ui/BackButton";
import { COLORS } from "@/utils/colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />

        <Text style={styles.headerTitle}>Settings</Text>
        {/* Empty view to keep title centered */}
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingsRow title="Notifications" icon="notifications" />
          <SettingsRow title="Saved Locations" icon="location" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingsRow title="Help & Support" icon="help-circle" size={29} />
          <SettingsRow
            title="About Parfiora"
            icon="information-circle"
            size={29}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingsRow title="Privacy & Security" icon="shield-checkmark" />
        </View>
      </ScrollView>
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
    gap: wp("5%"),
  },
  section: {
    gap: wp("1%"),
  },
  sectionTitle: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 18,
    color: COLORS.secondaryColor,
  },
});
