import { SafeAreaView, StyleSheet, Button, Text, View } from "react-native";
import { useContext, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { RatingsContext } from "../utils/Ratings";
import { useTheme } from "@react-navigation/native";
import { RowView } from "../components/RowView";
import { Badge } from "../components/Badge";

import Ionicons from "@expo/vector-icons/Ionicons";

const scoreLabels = ["🛑", "⚠️", "✅"];

export const MapScreen = ({ navigation }) => {
  const { colors } = useTheme();
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
          <Marker key={r.id} coordinate={r.coordinate}>
            <Callout
              tooltip
              style={[styles.calloutStyle, { backgroundColor: colors.background }]}
              onPress={() => navigation.navigate("DetailView", { rating: r })}
            >
              <RowView>
                <View style={styles.dataView}>
                  <RowView>
                    <Text style={[styles.headerText, { color: colors.text }]}>
                      {r.locationName}
                    </Text>
                  </RowView>
                  <RowView style={styles.detailRow}>
                    <Badge text={scoreLabels[r.score]} style={styles.scoreBadge} />
                    {r.size ? <Badge text={`${r.size}oz`} /> : null}
                    {r.temp ? <Badge text={r.temp} /> : null}
                    {r.milk ? <Badge text={r.milk} /> : null}
                  </RowView>
                </View>
                <View style={styles.buttonView}>
                  <Ionicons name="chevron-forward" size={24} color={colors.text} />
                </View>
              </RowView>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  calloutStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowRadius: 12,
    shadowOffset: { width: 12, height: -8 },
    shadowOpacity: 0.6,
  },
  scoreBadge: {
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 16,
  },
  detailRow: {
    justifyContent: "flex-start",
  },
  buttonView: {
    justifyContent: "center",
    alignContent: "center",
  },
  dataView: {
    flexGrow: 1,
  },
});
