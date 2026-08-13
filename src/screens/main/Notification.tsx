import NotificationCard from "@/components/account/NotificationCard";
import BackButton from "@/components/ui/BackButton";
import { notifications } from "@/data/dummyData";
import { COLORS } from "@/utils/colors";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />

        <Text style={styles.headerTitle}>Notifications</Text>

        {/* Keeps the title centered */}
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <NotificationCard
            title={item.title}
            message={item.message}
            time={item.time}
            icon={item.icon}
            read={item.read}
          />
        )}
      />
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
    gap: wp("1%"),
  },
});
