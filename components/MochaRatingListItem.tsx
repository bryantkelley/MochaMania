import { Platform, PlatformColor, Pressable, StyleSheet, Text, View } from "react-native";
import type { MochaRating } from "../utils/types";
import { RowView } from "./RowView";
import { Badge } from "./Badge";
import { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

type MochaRatingListItemProps = {
  rating: MochaRating;
};

const scoreLabels = ["🛑", "⚠️", "✅"];
export const MochaRatingListItem = ({ rating }: MochaRatingListItemProps) => {
  const { locationName, size, milk, temp, score } = rating;

  return (
    <Pressable style={styles.container} onPress={() => {}}>
      <RowView>
        <View style={styles.dataView}>
          <RowView>
            <Text style={styles.headerText}>{locationName}</Text>
          </RowView>
          <RowView style={styles.detailRow}>
            <Badge text={scoreLabels[score]} style={styles.scoreBadge} />
            {size ? <Badge text={`${size}oz`} /> : null}
            {temp ? <Badge text={temp} /> : null}
            {milk ? <Badge text={milk} /> : null}
          </RowView>
        </View>
        <View style={styles.buttonView}>
          <Ionicons name="chevron-forward" size={24} color={PlatformColor("systemFill")} />
        </View>
      </RowView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor("systemBackground"),
      },
    }),
    flex: 1,
  },
  scoreBadge: {
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 16,
  },
  detailRow: {
    justifyContent: "flex-start",
  },
  buttonView: {
    justifyContent: "center",
    alignContent: "center",
  },
  dataView: {
    flexGrow: 1,
  },
});
