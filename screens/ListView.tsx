import { FlatList, SafeAreaView, StyleSheet, Button, View, Text } from "react-native";
import { MochaRatingListItem } from "../components/MochaRatingListItem";
import { useContext, useEffect } from "react";
import { RatingsContext } from "../utils/Ratings";
import { useTheme } from "@react-navigation/native";
import { RowView } from "../components/RowView";

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
      {ratings.length === 0 ? (
        <View style={styles.noRatingsView}>
          <Text style={[styles.noRatingsHeader, { color: colors.text }]}>No Ratings</Text>
          <Text style={[styles.noRatingsText, { color: colors.text }]}>Go get some coffee.</Text>
        </View>
      ) : null}
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
  noRatingsView: {
    flex: 1,
    alignItems: "center",
  },
  noRatingsHeader: {
    fontSize: 24,
  },
  noRatingsText: {
    fontSize: 16,
  },
});
