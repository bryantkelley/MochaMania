import { SafeAreaView, StyleSheet, Platform, PlatformColor, Text, Button } from "react-native";
import { useContext, useEffect } from "react";
import { RatingsContext } from "../utils/Ratings";

export const MapView = ({ navigation }) => {
  const { ratings } = useContext(RatingsContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add"
          onPress={() => {
            navigation.navigate("MapAddRating");
          }}
        />
      ),
    });
  }, [navigation]);

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
