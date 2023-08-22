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
import { StackParamList, MochaRating } from "../utils/types";
import { MochaRatingInput } from "../components/MochaRatingInput";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const EditRating = ({ route }) => {
  const { rating } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { updateRating } = useContext(RatingsContext);

  const [ratingToEdit, setRatingtoEdit] = useState<MochaRating>(rating);

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            updateRating(rating.id, ratingToEdit);
            navigation.navigate("DetailView", { rating: ratingToEdit });
          }}
        />
      ),
    });
  }, [navigation, rating, ratingToEdit]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <MochaRatingInput rating={ratingToEdit} setRating={setRatingtoEdit} />
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
