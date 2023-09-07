import { StyleSheet, Button, KeyboardAvoidingView, ScrollView, Keyboard, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { RatingsContext } from "../utils/Ratings";
import { MochaRating } from "../utils/types";
import { MochaRatingInput } from "../components/MochaRatingInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AddRating = ({ navigation }) => {
  const { addRating } = useContext(RatingsContext);

  const blankRating: MochaRating = {
    locationName: "",
    coordinate: {
      latitude: 47.60998,
      longitude: -122.34262,
    },
    date: new Date().toISOString(),
    size: 16,
    temp: "iced",
    milk: "oat",
    score: 1,
    notes: "",
  };

  const [rating, setRating] = useState<MochaRating>(blankRating);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
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

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="position"
      keyboardVerticalOffset={-148 - insets.top}
    >
      <View
        style={{
          paddingBottom: keyboardVisible ? 212 + insets.bottom : 0,
        }}
      >
        <ScrollView>
          <MochaRatingInput rating={rating} setRating={setRating} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  spaceBetweenRow: {
    justifyContent: "space-evenly",
    marginHorizontal: 4,
  },
});
