import LocationCard from "@/components/account/LocationCard";
import BackButton from "@/components/ui/BackButton";
import { savedLocations } from "@/data/dummyData";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedLocations() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Saved Locations</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={savedLocations}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <LocationCard
            label={item.label}
            address={item.address}
            icon={item.icon}
          />
        )}
      />

      {/* Add Location Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add New Location</Text>
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
    fontSize: 20,
    color: COLORS.textColor,
  },
  content: {
    paddingTop: wp("2%"),
    paddingBottom: wp("5%"),
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp("2%"),
    backgroundColor: COLORS.secondaryColor,
    height: 56,
    borderRadius: 28,
    marginBottom: wp("4%"),
  },
  addButtonText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
});
