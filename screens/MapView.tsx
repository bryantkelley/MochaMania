import { FlatList, SafeAreaView, StyleSheet, Platform, PlatformColor, Button } from "react-native";
import type { MochaRating } from "../utils/types";
import { MochaRatingListItem } from "../components/MochaRatingListItem";
import { useEffect } from "react";

export const MapView = ({ navigation }) => {
  const ratings: MochaRating[] = [
    {
      locationName: "Caffe Vita",
      date: "2022-08-19",
      score: 0,
      size: 12,
      temp: "iced",
      milk: "oat",
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={() => ratings.push(ratings[0])} />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={ratings}
        renderItem={({ item }) => <MochaRatingListItem rating={item} />}
      />
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
