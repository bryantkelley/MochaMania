import {
  StyleSheet,
  Platform,
  PlatformColor,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  View,
  Text,
  Keyboard,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { RatingsContext } from "../utils/Ratings";
import { StackParamList, MochaRating } from "../utils/types";
import { MochaRatingInput } from "../components/MochaRatingInput";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RowView } from "../components/RowView";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const EditRating = ({ route }) => {
  const { rating } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { colors } = useTheme();
  const { updateRating, deleteRating } = useContext(RatingsContext);

  const [ratingToEdit, setRatingtoEdit] = useState<MochaRating>(rating);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets();

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
          <MochaRatingInput rating={ratingToEdit} setRating={setRatingtoEdit} />
          <RowView style={styles.spaceEvenlyRow}>
            <Button
              title="Delete Rating"
              onPress={() => setDeleteModalVisible(true)}
              color={styles.dangerousButton.color}
            />
          </RowView>
          <Modal
            visible={deleteModalVisible}
            presentationStyle="pageSheet"
            animationType="slide"
            style={{ backgroundColor: colors.card }}
          >
            <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalText, { color: colors.text }]}>
                Delete this rating? This action is not reversible.
              </Text>
              <RowView style={styles.spaceEvenlyRow}>
                <Button
                  title="Confirm"
                  onPress={() => {
                    deleteRating(rating.id);
                    setDeleteModalVisible(false);
                    navigation.navigate("MainView");
                  }}
                  color={styles.dangerousButton.color}
                />
                <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
              </RowView>
            </View>
          </Modal>
        </ScrollView>
      </View>
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
  spaceBetweenRow: {
    justifyContent: "space-evenly",
    marginHorizontal: 4,
  },
  modalContainer: {
    padding: 16,
    flex: 1,
  },
  modalText: {
    fontSize: 36,
  },
  spaceEvenlyRow: {
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  dangerousButton: {
    ...Platform.select({
      ios: {
        color: PlatformColor("systemRed"),
      },
    }),
  },
});
