import { Pressable, StyleSheet, Text, View } from "react-native";
import type { StackParamList, MochaRating } from "../utils/types";
import { RowView } from "./RowView";
import { Badge } from "./Badge";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type MochaRatingListItemProps = {
  rating: MochaRating;
};

const scoreLabels = ["🛑", "⚠️", "✅"];
export const MochaRatingListItem = ({ rating }: MochaRatingListItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { colors } = useTheme();
  const { locationName, size, milk, temp, score } = rating;

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.background }]}
      onPress={() => navigation.navigate("DetailView", { rating })}
    >
      <RowView>
        <View style={styles.dataView}>
          <RowView>
            <Text style={[styles.headerText, { color: colors.text }]}>{locationName}</Text>
          </RowView>
          <RowView style={styles.detailRow}>
            <Badge text={scoreLabels[score]} style={styles.scoreBadge} />
            {size ? <Badge text={`${size}oz`} /> : null}
            {temp ? <Badge text={temp} /> : null}
            {milk ? <Badge text={milk} /> : null}
          </RowView>
        </View>
        <View style={styles.buttonView}>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </View>
      </RowView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
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
