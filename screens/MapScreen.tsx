import { SafeAreaView, StyleSheet, Button } from "react-native";
import { useContext, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { RatingsContext } from "../utils/Ratings";

const scoreLabels = ["🛑", "⚠️", "✅"];

export const MapScreen = ({ navigation }) => {
  const { ratings, initialRegion } = useContext(RatingsContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add"
          onPress={() => {
            navigation.navigate("AddRating");
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.mapStyle} region={initialRegion}>
        {ratings.map((r) => (
          <Marker
            key={r.id}
            coordinate={r.coordinate}
            title={`${r.locationName} ${scoreLabels[r.score]}`}
            description={r.notes}
          />
        ))}
      </MapView>
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
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
