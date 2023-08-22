import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
  PlatformColor,
  Button,
  View,
} from "react-native";
import { MochaRatingListItem } from "../components/MochaRatingListItem";
import { useContext, useEffect } from "react";
import { RatingsContext } from "../utils/Ratings";

export const ListView = ({ navigation }) => {
  const { ratings } = useContext(RatingsContext);

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
      <FlatList
        style={styles.list}
        data={ratings}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => <MochaRatingListItem rating={item} key={index} />}
      />
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
  list: {
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor("secondarySystemBackground"),
      },
    }),
  },
  separator: {
    margin: 0,
    ...Platform.select({
      ios: {
        height: 1,
        backgroundColor: PlatformColor("separator"),
      },
    }),
  },
});
