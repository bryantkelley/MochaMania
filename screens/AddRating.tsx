import {
  StyleSheet,
  Platform,
  PlatformColor,
  Button,
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { RatingsContext } from "../utils/Ratings";
import {
  DrinkSize,
  DrinkSizes,
  DrinkTemp,
  DrinkTemps,
  Milk,
  Milks,
  MochaRating,
} from "../utils/types";
import { RowView } from "../components/RowView";
import { Picker } from "@react-native-picker/picker";

export const AddRating = ({ navigation }) => {
  const { addRating } = useContext(RatingsContext);

  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [date, setDate] = useState();
  const [size, setSize] = useState<DrinkSize>(16);
  const [temp, setTemp] = useState<DrinkTemp>("iced");
  const [milk, setMilk] = useState<Milk>("oat");
  const [score, setScore] = useState<MochaRating["score"]>(1);
  const [notes, setNotes] = useState("");

  const [rating, setRating] = useState<MochaRating>();

  useEffect(() => {
    setRating({
      locationName,
      coordinate: {
        latitude,
        longitude,
      },
      date,
      size,
      milk,
      temp,
      score,
      notes,
    });
  }, [locationName, latitude, longitude, date, size, milk, temp, score, notes]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            addRating(rating);
            navigation.navigate("ListView");
          }}
        />
      ),
    });
  }, [navigation, rating]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text id="locationNameLabel" style={styles.inputLabel}>
            Coffee Shop Name
          </Text>
          <TextInput
            onChangeText={setLocationName}
            value={locationName}
            placeholder="Coffee Shop Name"
            style={styles.input}
            aria-labelledby="locationNameLabel"
          />
        </View>
        <RowView style={styles.spaceBetweenRow}>
          <View style={styles.pickerInputContainer}>
            <Text id="sizeLabel" style={styles.inputLabel}>
              Size
            </Text>
            <Picker
              selectedValue={size}
              onValueChange={(itemValue) => setSize(itemValue)}
              style={styles.pickerInput}
            >
              {DrinkSizes.map((d) => (
                <Picker.Item value={d} label={`${d}oz`} key={d} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerInputContainer}>
            <Text id="tempLabel" style={styles.inputLabel}>
              Temp
            </Text>
            <Picker
              selectedValue={temp}
              onValueChange={(itemValue) => setTemp(itemValue)}
              style={styles.pickerInput}
            >
              {DrinkTemps.map((d) => (
                <Picker.Item value={d} label={d} key="d" />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerInputContainer}>
            <Text id="scoreLabel" style={styles.inputLabel}>
              Rating
            </Text>
            <Picker
              selectedValue={score}
              onValueChange={(itemValue) => setScore(itemValue)}
              style={styles.pickerInput}
            >
              <Picker.Item value={2} label="✅" />
              <Picker.Item value={1} label="⚠️" />
              <Picker.Item value={0} label="🛑" />
            </Picker>
          </View>
        </RowView>
        <RowView style={styles.spaceBetweenRow}>
          <View style={styles.pickerInputContainer}>
            <Text id="milkLabel" style={styles.inputLabel}>
              Milk
            </Text>
            <Picker
              selectedValue={milk}
              onValueChange={(itemValue) => setMilk(itemValue)}
              style={styles.pickerInput}
            >
              {Milks.map((d) => (
                <Picker.Item value={d} label={d} key={d} />
              ))}
            </Picker>
          </View>
        </RowView>
        <View style={styles.inputContainer}>
          <Text id="notesLabel" style={styles.inputLabel}>
            Notes
          </Text>
          <TextInput
            onChangeText={setNotes}
            value={notes}
            placeholder="Notes"
            style={styles.input}
            aria-labelledby="notesLabel"
          />
        </View>
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
