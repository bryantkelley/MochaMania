import { FlatList, SafeAreaView, StyleSheet, Platform, PlatformColor, Button } from "react-native";
import { MochaRatingListItem } from "../components/MochaRatingListItem";
import { useContext } from "react";
import { RatingsContext } from "../utils/Ratings";

export const ListView = () => {
  const { ratings } = useContext(RatingsContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={ratings}
        renderItem={({ item, index }) => <MochaRatingListItem rating={item} key={index} />}
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
