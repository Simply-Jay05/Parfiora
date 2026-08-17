import { seedProducts } from "@/services/seedProducts";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SeedProducts() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [progress, setProgress] = useState("");
  const [completed, setCompleted] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Product Seeder</Text>

        <Text style={styles.text}>
          This will upload the local product images to Cloudinary and create the
          product documents in Firestore.
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 20,
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
