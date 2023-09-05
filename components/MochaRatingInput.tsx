import {
  StyleSheet,
  Platform,
  PlatformColor,
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Dispatch, SetStateAction } from "react";
import { DrinkSizes, DrinkTemps, Milks, MochaRating } from "../utils/types";
import { RowView } from "../components/RowView";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@react-navigation/native";

type MochaRatingInputProps = {
  rating: MochaRating;
  setRating: Dispatch<SetStateAction<MochaRating>>;
};

export const MochaRatingInput = ({ rating, setRating }: MochaRatingInputProps) => {
  const { colors } = useTheme();
  const { locationName, coordinate, date, size, milk, temp, score, notes } = rating;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text id="locationNameLabel" style={[styles.inputLabel, { color: colors.text }]}>
            Coffee Shop Name
          </Text>
          <TextInput
            onChangeText={(text) => setRating((prev) => ({ ...prev, locationName: text }))}
            value={locationName}
            placeholder="Coffee Shop Name"
            style={[styles.input, { color: colors.text }]}
            aria-labelledby="locationNameLabel"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text id="dateLabel" style={[styles.inputLabel, { color: colors.text }]}>
            Date
          </Text>
          <RowView style={styles.dateContainer}>
            <DateTimePicker
              aria-labelledby="dateLabel"
              value={new Date(date)}
              mode="datetime"
              onChange={(e, d) => setRating((prev) => ({ ...prev, date: d.toISOString() }))}
            />
          </RowView>
        </View>
        <View style={styles.inputContainer}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              key="input-marker"
              draggable
              coordinate={coordinate}
              onDragEnd={(e) => {
                e.persist();
                setRating((prev) => ({
                  ...prev,
                  coordinate: e?.nativeEvent?.coordinate ?? prev.coordinate,
                }));
              }}
            />
          </MapView>
        </View>
        <RowView style={styles.spaceBetweenRow}>
          <View style={styles.pickerInputContainer}>
            <Text id="scoreLabel" style={[styles.inputLabel, { color: colors.text }]}>
              Rating
            </Text>
            <Picker
              selectedValue={score}
              onValueChange={(itemValue) => setRating((prev) => ({ ...prev, score: itemValue }))}
              style={styles.pickerInput}
            >
              <Picker.Item value={2} label="✅" color={colors.text} />
              <Picker.Item value={1} label="⚠️" color={colors.text} />
              <Picker.Item value={0} label="🛑" color={colors.text} />
            </Picker>
          </View>
          <View style={styles.pickerInputContainer}>
            <Text id="sizeLabel" style={[styles.inputLabel, { color: colors.text }]}>
              Size
            </Text>
            <Picker
              selectedValue={size}
              onValueChange={(itemValue) => setRating((prev) => ({ ...prev, size: itemValue }))}
              style={styles.pickerInput}
            >
              {DrinkSizes.map((d) => (
                <Picker.Item value={d} label={`${d}oz`} key={d} color={colors.text} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerInputContainer}>
            <Text id="tempLabel" style={[styles.inputLabel, { color: colors.text }]}>
              Temp
            </Text>
            <Picker
              selectedValue={temp}
              onValueChange={(itemValue) => setRating((prev) => ({ ...prev, temp: itemValue }))}
              style={styles.pickerInput}
            >
              {DrinkTemps.map((d) => (
                <Picker.Item value={d} label={d} key="d" color={colors.text} />
              ))}
            </Picker>
          </View>
        </RowView>
        <RowView style={styles.spaceBetweenRow}>
          <View style={styles.pickerInputContainer}>
            <Text id="milkLabel" style={[styles.inputLabel, { color: colors.text }]}>
              Milk
            </Text>
            <Picker
              selectedValue={milk}
              onValueChange={(itemValue) => setRating((prev) => ({ ...prev, milk: itemValue }))}
              style={styles.pickerInput}
            >
              {Milks.map((d) => (
                <Picker.Item value={d} label={d} key={d} color={colors.text} />
              ))}
            </Picker>
          </View>
        </RowView>
        <View style={styles.inputContainer}>
          <Text id="notesLabel" style={[styles.inputLabel, { color: colors.text }]}>
            Notes
          </Text>
          <TextInput
            onChangeText={(text) => setRating((prev) => ({ ...prev, notes: text }))}
            value={notes}
            placeholder="Notes"
            style={[styles.input, { color: colors.text }]}
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
  mapStyle: {
    width: "100%",
    height: 256,
    borderRadius: 16,
  },
  dateContainer: {
    minHeight: 48,
    paddingTop: 4,
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor("tertiarySystemBackground"),
      },
    }),
    borderRadius: 16,
  },
});
