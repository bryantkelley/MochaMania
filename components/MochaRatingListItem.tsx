import { Platform, PlatformColor, StyleSheet, Text, View } from "react-native";
import type { MochaRating } from "../utils/types";
import { RowView } from "./RowView";
import { Badge } from "./Badge";

type MochaRatingListItemProps = {
  rating: MochaRating;
};

const scoreLabels = ["🛑", "⚠️", "✅"];
export const MochaRatingListItem = ({ rating }: MochaRatingListItemProps) => {
  const { locationName, size, milk, temp, score } = rating;
  return (
    <View style={styles.container}>
      <RowView style={styles.spaceBetweenRow}>
        <Text style={styles.headerText}>{locationName}</Text>
        <Text>{scoreLabels[score]}</Text>
      </RowView>
      <RowView style={styles.spaceEvenlyRow}>
        {size ? <Badge text={`${size}oz`} /> : null}
        {temp ? <Badge text={temp} /> : null}
        {milk ? <Badge text={milk} /> : null}
      </RowView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    ...Platform.select({
      ios: {
        borderColor: PlatformColor("separator"),
        backgroundColor: PlatformColor("systemBackground"),
      },
    }),
    borderBottomWidth: 1,
  },
  detailText: {
    textTransform: "uppercase",
    fontSize: 12,
  },
  headerText: {
    fontSize: 16,
  },
  spaceEvenlyRow: {
    justifyContent: "space-evenly",
    width: "100%",
  },
  spaceBetweenRow: {
    justifyContent: "space-between",
  },
});
