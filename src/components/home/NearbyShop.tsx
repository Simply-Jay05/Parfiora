import { useUserLocation } from "@/hooks/useUserLocation";
import {
  attachDistanceAndSort,
  formatDistance,
  getBranches,
} from "@/services/branchService";
import { BranchWithDistance } from "@/types/branch";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import NearbyShopCard from "./NearbyShopCard";

export default function NearbyShops() {
  const {
    latitude,
    longitude,
    isLoading: locationLoading,
    permissionDenied,
    errorMessage: locationError,
    requestLocation,
  } = useUserLocation();

  const [branches, setBranches] = useState<BranchWithDistance[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await getBranches();
        setBranches(attachDistanceAndSort(data, latitude, longitude));
      } catch (error) {
        console.error("Error fetching branches:", error);
        setFetchError("Couldn't load nearby shops.");
      } finally {
        setBranchesLoading(false);
      }
    };

    // Wait for the location attempt to resolve (granted, denied, or errored)
    // before fetching, so we can sort by distance on the first render.
    if (!locationLoading) {
      fetchBranches();
    }
  }, [locationLoading, latitude, longitude]);

  const isLoading = locationLoading || branchesLoading;

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Shops</Text>

        {permissionDenied && (
          <TouchableOpacity onPress={requestLocation}>
            <Text style={styles.viewAll}>Enable Location</Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <View style={styles.stateBox}>
          <ActivityIndicator color={COLORS.primaryColor} />
        </View>
      ) : fetchError ? (
        <View style={styles.stateBox}>
          <Ionicons name="cloud-offline-outline" size={22} color="#999" />
          <Text style={styles.stateText}>{fetchError}</Text>
        </View>
      ) : branches.length === 0 ? (
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>No shops available yet.</Text>
        </View>
      ) : (
        <>
          {permissionDenied && (
            <Text style={styles.hintText}>
              Turn on location to see shops sorted by distance from you.
            </Text>
          )}
          {locationError && (
            <Text style={styles.hintText}>{locationError}</Text>
          )}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shops}
          >
            {branches.map((branch) => (
              <NearbyShopCard
                key={branch.id}
                name={branch.name}
                location={branch.address}
                distance={formatDistance(branch.distanceKm)}
                latitude={branch.latitude}
                longitude={branch.longitude}
                image={branch.image}
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp("4%"),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "BricolageGrotesque-SemiBold",
    fontSize: 20,
  },

  viewAll: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 13,
    color: COLORS.secondaryColor,
  },

  shops: {
    gap: wp("4%"),
  },

  stateBox: {
    height: wp("32%"),
    justifyContent: "center",
    alignItems: "center",
    gap: wp("2%"),
  },

  stateText: {
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    color: "#999",
  },

  hintText: {
    fontFamily: "Manrope-Regular",
    fontSize: 12,
    color: "#999",
    marginTop: -wp("2%"),
  },
});
