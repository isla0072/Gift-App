import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useData } from "../context/AppContext";
import { randomUUID } from "expo-crypto";
import DatePicker from "react-native-modern-datepicker";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigation = useNavigation();
  const { addPerson } = useData();

  const savePerson = async () => {
    if (!name || !dob) {
      setShowErrorModal(true);
      return;
    }

    const newPerson = {
      id: await randomUUID(),
      name: name,
      dob: dob,
      ideas: [],
    };

    await addPerson(newPerson);
    navigation.navigate("PeopleScreen");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <DatePicker
        style={{ marginVertical: 15 }}
        onSelectedChange={setDob}
        options={{
          backgroundColor: "#FFFFFF",
          textHeaderColor: "#333333",
          textDefaultColor: "#333333",
          selectedTextColor: "#0587FF",
          mainColor: "#0587FF",
          textSecondaryColor: "#9F9F9F",
          borderColor: "#EAEAEA",
        }}
        current={new Date().toISOString().split("T")[0]}
        mode="calendar"
      />
      <Button title="Save" onPress={savePerson} />
      <Button
        title="Cancel"
        onPress={() => navigation.navigate("PeopleScreen")}
      />
      {showErrorModal && (
        <Modal
          transparent={true}
          visible={showErrorModal}
          animationType="slide"
          onRequestClose={() => setShowErrorModal(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Error: Both name and date of birth must be provided.
            </Text>
            <Button title="Close" onPress={() => setShowErrorModal(false)} />
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: "80%",
    alignSelf: "center",
    marginVertical: 20,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 15,
  },
});

export default AddPersonScreen;
