import { FlatList, SafeAreaView, StyleSheet, Button, View } from "react-native";
import { MochaRatingListItem } from "../components/MochaRatingListItem";
import { useContext, useEffect } from "react";
import { RatingsContext } from "../utils/Ratings";
import { useTheme } from "@react-navigation/native";

export const ListView = ({ navigation }) => {
  const { colors } = useTheme();
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
        data={ratings}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
        )}
        renderItem={({ item, index }) => <MochaRatingListItem rating={item} key={index} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  separator: {
    margin: 0,
    height: 1,
  },
});
