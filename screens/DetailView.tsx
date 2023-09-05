import { SafeAreaView, StyleSheet, Button, View, ScrollView, Text } from "react-native";
import { useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MochaRating, StackParamList } from "../utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RowView } from "../components/RowView";
import { Badge } from "../components/Badge";
import MapView, { Marker } from "react-native-maps";

const scoreLabels = ["🛑", "⚠️", "✅"];

export const DetailView = ({ route }) => {
  const { rating } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const { colors } = useTheme();

  const { date, score, coordinate, size, temp, milk, notes } = rating as MochaRating;

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
            region={{
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
        {date ? (
          <View style={styles.notesView}>
            <Text style={[styles.headerText, { color: colors.text }]}>Date</Text>
            <Text style={{ color: colors.text }}>{new Date(date).toLocaleString()}</Text>
          </View>
        ) : null}
        <View style={styles.notesView}>
          <Text style={[styles.headerText, { color: colors.text }]}>Notes</Text>
          <Text style={{ color: colors.text }}>{notes}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: 16,
    marginVertical: 8,
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
