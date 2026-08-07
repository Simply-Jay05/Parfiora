import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type Props = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: hp("1%"),
  },

  title: {
    fontFamily: "BricolageGrotesque-Bold",
    fontSize: 25,
  },

  subtitle: {
    fontFamily: "Manrope-Regular",
    fontSize: 16,
  },
});
