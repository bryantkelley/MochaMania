import {
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TextInput,
  Text,
  Keyboard,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { RatingsContext } from "../utils/Ratings";
import { useTheme } from "@react-navigation/native";
import { RowView } from "../components/RowView";
import { Badge } from "../components/Badge";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";

const scoreLabels = ["🛑", "⚠️", "✅"];

export const MapScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { ratings, initialRegion } = useContext(RatingsContext);
  const insets = useSafeAreaInsets();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add"
          onPress={() => {
            navigation.navigate("AddRating");
          }}
        />
      ),
    });
  }, [navigation]);

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
        <MapView style={styles.mapStyle} region={initialRegion}>
          {ratings.map((r) => (
            <Marker key={r.id} coordinate={r.coordinate}>
              <Callout
                tooltip
                style={[styles.calloutStyle, { backgroundColor: colors.background }]}
                onPress={() => navigation.navigate("DetailView", { rating: r })}
              >
                <RowView>
                  <View style={styles.dataView}>
                    <RowView>
                      <Text style={[styles.headerText, { color: colors.text }]}>
                        {r.locationName}
                      </Text>
                    </RowView>
                    <RowView style={styles.detailRow}>
                      <Badge text={scoreLabels[r.score]} style={styles.scoreBadge} />
                      {r.size ? <Badge text={`${r.size}oz`} /> : null}
                      {r.temp ? <Badge text={r.temp} /> : null}
                      {r.milk ? <Badge text={r.milk} /> : null}
                    </RowView>
                  </View>
                  <View style={styles.buttonView}>
                    <Ionicons name="chevron-forward" size={24} color={colors.text} />
                  </View>
                </RowView>
              </Callout>
            </Marker>
          ))}
          <View
            style={[
              styles.inputContainer,
              ,
              {
                backgroundColor: colors.background,
                marginTop: keyboardVisible ? 212 + insets.bottom : "auto",
              },
            ]}
          >
            <Text id="locationNameLabel" style={[styles.inputLabel, { color: colors.text }]}>
              Filter by Coffee Shop Name
            </Text>
            <TextInput
              onChangeText={(text) => {}}
              value={""}
              placeholder="Coffee Shop Name"
              style={[styles.input, { color: colors.text, backgroundColor: colors.card }]}
              aria-labelledby="locationNameLabel"
            />
          </View>
        </MapView>
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
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  calloutStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowRadius: 12,
    shadowOffset: { width: 12, height: -8 },
    shadowOpacity: 0.5,
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
  inputContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowRadius: 12,
    shadowOffset: { width: 12, height: -8 },
    shadowOpacity: 0.5,
  },
  inputLabel: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  input: {
    minHeight: 48,
    padding: 8,
    borderRadius: 16,
  },
});
