import { FlatList, SafeAreaView, StyleSheet, Platform, PlatformColor, Button } from "react-native";
import type { MochaRating } from "../utils/types";
import { MochaRatingListItem } from "../components/MochaRatingListItem";

export const Home = ({ navigation }) => {
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
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={ratings}
        renderItem={({ item }) => <MochaRatingListItem rating={item} />}
      />
      <Button onPress={() => navigation.navigate("ListView")} title="Go to List View" />
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
