import {
  StyleSheet,
  Platform,
  PlatformColor,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { RatingsContext } from "../utils/Ratings";
import { MochaRating } from "../utils/types";
import { MochaRatingInput } from "../components/MochaRatingInput";

export const AddRating = ({ navigation }) => {
  const { addRating } = useContext(RatingsContext);

  const blankRating: MochaRating = {
    locationName: "",
    date: "",
    size: 16,
    temp: "iced",
    milk: "oat",
    score: 1,
    notes: "",
  };

  const [rating, setRating] = useState<MochaRating>(blankRating);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            addRating(rating);
            navigation.goBack();
            setRating(blankRating);
          }}
        />
      ),
    });
  }, [navigation, rating]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <MochaRatingInput rating={rating} setRating={setRating} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor("secondarySystemBackground"),
      },
    }),
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  inputContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  inputLabel: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  input: {
    minHeight: 48,
    padding: 8,
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor("tertiarySystemBackground"),
      },
    }),
    borderRadius: 16,
  },
  pickerInput: {
    minHeight: 48,
    padding: 4,
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor("tertiarySystemBackground"),
      },
    }),
    borderRadius: 16,
  },
  pickerInputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  spaceBetweenRow: {
    justifyContent: "space-evenly",
    marginHorizontal: 4,
  },
});
