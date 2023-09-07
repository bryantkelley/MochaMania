import { useContext, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, Modal, View } from "react-native";
import { RatingsContext } from "../utils/Ratings";
import { RowView } from "../components/RowView";
import { useTheme } from "@react-navigation/native";

export const Settings = ({ navigation }) => {
  const { colors } = useTheme();
  const { dangerousClearAllRatings, dangerousLoadExampleRatings } = useContext(RatingsContext);
  const [replaceModalVisible, setReplaceModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Button
        title="Replace with Example Data"
        onPress={() => setReplaceModalVisible(true)}
        color={colors.notification}
      />
      <Modal visible={replaceModalVisible} presentationStyle="pageSheet" animationType="slide">
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.modalText, { color: colors.text }]}>
            This will replace all ratings in the app with sample ratings. This is not reversible.
          </Text>
          <RowView style={styles.spaceEvenlyRow}>
            <Button
              title="Confirm"
              onPress={() => {
                dangerousLoadExampleRatings();
                setReplaceModalVisible(false);
              }}
              color={colors.notification}
            />
            <Button title="Cancel" onPress={() => setReplaceModalVisible(false)} />
          </RowView>
        </View>
      </Modal>
      <Button
        title="Delete Everything"
        onPress={() => setDeleteModalVisible(true)}
        color={colors.notification}
      />
      <Modal
        visible={deleteModalVisible}
        presentationStyle="pageSheet"
        animationType="slide"
        style={{ backgroundColor: colors.card }}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.modalText, { color: colors.text }]}>
            This will delete all ratings in the app. This is not reversible.
          </Text>
          <RowView style={styles.spaceEvenlyRow}>
            <Button
              title="Confirm"
              onPress={() => {
                dangerousClearAllRatings();
                setDeleteModalVisible(false);
              }}
              color={colors.notification}
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  modalContainer: {
    padding: 16,
    flex: 1,
  },
  modalText: {
    fontSize: 48,
  },
  spaceEvenlyRow: {
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
});
