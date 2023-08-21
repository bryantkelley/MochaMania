import {
  StyleSheet,
  Platform,
  PlatformColor,
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DrinkSizes, DrinkTemps, Milks, MochaRating } from "../utils/types";
import { RowView } from "../components/RowView";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

type MochaRatingInputProps = {
  rating: MochaRating;
  setRating: Dispatch<SetStateAction<MochaRating>>;
};

export const MochaRatingInput = ({ rating, setRating }: MochaRatingInputProps) => {
  const navigation = useNavigation();

  const { locationName, coordinate, date, size, milk, temp, score, notes } = rating;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text id="locationNameLabel" style={styles.inputLabel}>
            Coffee Shop Name
          </Text>
          <TextInput
            onChangeText={(text) => setRating((prev) => ({ ...prev, locationName: text }))}
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
              onValueChange={(itemValue) => setRating((prev) => ({ ...prev, size: itemValue }))}
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
              onValueChange={(itemValue) => setRating((prev) => ({ ...prev, temp: itemValue }))}
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
              onValueChange={(itemValue) => setRating((prev) => ({ ...prev, score: itemValue }))}
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
              onValueChange={(itemValue) => setRating((prev) => ({ ...prev, milk: itemValue }))}
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
            onChangeText={(text) => setRating((prev) => ({ ...prev, notes: text }))}
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
