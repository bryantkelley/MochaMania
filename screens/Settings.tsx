import { useContext } from "react";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import { RatingsContext } from "../utils/Ratings";

export const Settings = ({ navigation }) => {
  const { dangerousClearAllRatings } = useContext(RatingsContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Settings</Text>
      <Button title="Delete Everything" onPress={() => dangerousClearAllRatings()} />
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
});
