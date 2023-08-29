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
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { RatingsContext } from "../utils/Ratings";
import { StackParamList, MochaRating } from "../utils/types";
import { MochaRatingInput } from "../components/MochaRatingInput";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RowView } from "../components/RowView";

export const EditRating = ({ route }) => {
  const { rating } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { updateRating, deleteRating } = useContext(RatingsContext);

  const [ratingToEdit, setRatingtoEdit] = useState<MochaRating>(rating);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
        <RowView style={styles.spaceEvenlyRow}>
          <Button
            title="Delete Rating"
            onPress={() => setDeleteModalVisible(true)}
            color={styles.dangerousButton.color}
          />
        </RowView>
        <Modal visible={deleteModalVisible} presentationStyle="pageSheet" animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Delete this rating? This action is not reversible.</Text>
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
  },
  modalText: {
    fontSize: 48,
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
