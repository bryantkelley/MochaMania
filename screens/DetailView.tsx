import { SafeAreaView, StyleSheet, Button, View, ScrollView, Text } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RowView } from "../components/RowView";
import { Badge } from "../components/Badge";
import MapView, { Marker } from "react-native-maps";

const scoreLabels = ["🛑", "⚠️", "✅"];

export const DetailView = ({ route }) => {
  const { rating } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { score, coordinate, size, temp, milk, notes } = rating;

  useEffect(() => {
    navigation.setOptions({
      title: rating.locationName,
      headerRight: () => (
        <Button
          title="Edit"
          onPress={() => {
            navigation.navigate("EditRating", { rating });
          }}
        />
      ),
    });
  }, [navigation, rating]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.notesView}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker key="input-marker" coordinate={coordinate} />
          </MapView>
        </View>
        <RowView style={styles.detailRow}>
          <Badge style={styles.scoreBadge} text={scoreLabels[score]} />
          {size ? <Badge text={`${size}oz`} /> : null}
          {temp ? <Badge text={temp} /> : null}
          {milk ? <Badge text={milk} /> : null}
        </RowView>
        <View style={styles.notesView}>
          <Text style={styles.headerText}>Notes</Text>
          <Text>{notes}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  scoreBadge: {
    backgroundColor: "transparent",
  },
  detailRow: {
    justifyContent: "center",
    fontSize: 16,
  },
  notesView: {
    margin: 16,
  },
  headerText: {
    fontSize: 16,
  },
  mapStyle: {
    width: "100%",
    height: 192,
    borderRadius: 16,
  },
});
