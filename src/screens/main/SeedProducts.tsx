import { seedBranches } from "@/services/seedBranches";
import { seedProducts } from "@/services/seedProducts";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SeedProducts() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [progress, setProgress] = useState("");
  const [completed, setCompleted] = useState(false);

  const [isSeedingBranches, setIsSeedingBranches] = useState(false);
  const [branchProgress, setBranchProgress] = useState("");
  const [branchesCompleted, setBranchesCompleted] = useState(false);

  const handleSeedProducts = async () => {
    if (isSeeding || completed) return;

    setIsSeeding(true);

    try {
      await seedProducts((current, total, name) => {
        setProgress(`Processing ${current}/${total}: ${name}`);
      });
      setCompleted(true);
      Alert.alert("Success", "All products have been seeded successfully.");
    } catch (error) {
      console.error("Product seeding failed:", error);

      Alert.alert(
        "Seeding Failed",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedBranches = async () => {
    if (isSeedingBranches || branchesCompleted) return;

    setIsSeedingBranches(true);

    try {
      await seedBranches((current, total, name) => {
        setBranchProgress(`Processing ${current}/${total}: ${name}`);
      });
      setBranchesCompleted(true);
      Alert.alert("Success", "All branches have been seeded successfully.");
    } catch (error) {
      console.error("Branch seeding failed:", error);

      Alert.alert(
        "Seeding Failed",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSeedingBranches(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Product Seeder</Text>

          <Text style={styles.text}>
            This will upload the local product images to Cloudinary and create
            the product documents in Firestore.
          </Text>

          {isSeeding && (
            <View style={styles.progressContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.progress}>{progress}</Text>
            </View>
          )}

          {completed ? (
            <Text style={styles.success}>✓ Products seeded successfully</Text>
          ) : (
            <TouchableOpacity
              style={[styles.button, isSeeding && styles.disabledButton]}
              onPress={handleSeedProducts}
              disabled={isSeeding}
            >
              <Text style={styles.buttonText}>
                {isSeeding ? "Seeding Products..." : "Seed Products"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.title}>Branch Seeder</Text>

          <Text style={styles.text}>
            This will upload your shop photos to Cloudinary and create the
            branch documents (name, address, coordinates) in Firestore, used for
            the Nearby Shops feature. Run this once.
          </Text>

          {isSeedingBranches && (
            <View style={styles.progressContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.progress}>{branchProgress}</Text>
            </View>
          )}

          {branchesCompleted ? (
            <Text style={styles.success}>✓ Branches seeded successfully</Text>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                isSeedingBranches && styles.disabledButton,
              ]}
              onPress={handleSeedBranches}
              disabled={isSeedingBranches}
            >
              <Text style={styles.buttonText}>
                {isSeedingBranches ? "Seeding Branches..." : "Seed Branches"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    gap: 28,
  },

  section: {
    gap: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },

  progressContainer: {
    alignItems: "center",
    gap: 15,
  },

  progress: {
    fontSize: 15,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  success: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "green",
  },
});
