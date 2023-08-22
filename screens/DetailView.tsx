import { SafeAreaView, StyleSheet, Button, View, ScrollView, Text } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RowView } from "../components/RowView";
import { Badge } from "../components/Badge";

const scoreLabels = ["🛑", "⚠️", "✅"];

export const DetailView = ({ route }) => {
  const { rating } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { locationName, score, size, temp, milk, notes } = rating;

  useEffect(() => {
    navigation.setOptions({
      title: locationName,
      headerRight: () => (
        <Button
          title="Edit"
          onPress={() => {
            navigation.navigate("EditRating", { rating });
          }}
        />
      ),
    });
  }, [navigation, locationName]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.scoreLabel}>{scoreLabels[score]}</Text>
        <RowView style={styles.detailRow}>
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

  scoreLabel: {
    fontSize: 48,
    textAlign: "center",
    margin: 8,
  },
  scoreBadge: {
    backgroundColor: "transparent",
  },
  detailRow: {
    justifyContent: "center",
  },
  notesView: {
    margin: 16,
  },
  headerText: {
    fontSize: 16,
  },
});
