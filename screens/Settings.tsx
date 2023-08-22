import { useContext, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  PlatformColor,
  Modal,
  View,
} from "react-native";
import { RatingsContext } from "../utils/Ratings";
import { RowView } from "../components/RowView";

export const Settings = ({ navigation }) => {
  const { dangerousClearAllRatings, dangerousLoadExampleRatings } = useContext(RatingsContext);
  const [replaceModalVisible, setReplaceModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Replace with Example Data"
        onPress={() => setReplaceModalVisible(true)}
        color={styles.dangerousButton.color}
      />
      <Modal visible={replaceModalVisible} presentationStyle="pageSheet" animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            This will replace all ratings in the app with sample ratings. This is not reversible.
          </Text>
          <RowView style={styles.spaceEvenlyRow}>
            <Button
              title="Confirm"
              onPress={() => {
                dangerousLoadExampleRatings();
                setReplaceModalVisible(false);
              }}
              color={styles.dangerousButton.color}
            />
            <Button title="Cancel" onPress={() => setReplaceModalVisible(false)} />
          </RowView>
        </View>
      </Modal>
      <Button
        title="Delete Everything"
        onPress={() => setDeleteModalVisible(true)}
        color={styles.dangerousButton.color}
      />
      <Modal visible={deleteModalVisible} presentationStyle="pageSheet" animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            This will delete all ratings in the app. This is not reversible.
          </Text>
          <RowView style={styles.spaceEvenlyRow}>
            <Button
              title="Confirm"
              onPress={() => {
                dangerousClearAllRatings();
                setDeleteModalVisible(false);
              }}
              color={styles.dangerousButton.color}
            />
            <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
          </RowView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor("systemBackground"),
      },
    }),
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  dangerousButton: {
    ...Platform.select({
      ios: {
        color: PlatformColor("systemRed"),
      },
    }),
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
});
