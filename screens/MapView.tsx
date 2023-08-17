import { SafeAreaView, StyleSheet, Platform, PlatformColor, Text } from "react-native";
import { useContext } from "react";
import { RatingsContext } from "../utils/Ratings";

export const MapView = () => {
  const { ratings } = useContext(RatingsContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Map View</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  list: {
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor("secondarySystemBackground"),
      },
    }),
  },
});
