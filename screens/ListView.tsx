import { FlatList, SafeAreaView, StyleSheet, Platform, PlatformColor, Button } from "react-native";
import { MochaRatingListItem } from "../components/MochaRatingListItem";
import { useContext, useEffect } from "react";
import { RatingsContext } from "../utils/Ratings";

export const ListView = ({ navigation }) => {
  const exampleRating = {
    locationName: "Caffe Vita",
    date: "2022-08-19",
    score: 0,
    size: 12,
    temp: "iced",
    milk: "oat",
  };

  const { ratings, addRating } = useContext(RatingsContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={() => addRating(exampleRating)} />,
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
