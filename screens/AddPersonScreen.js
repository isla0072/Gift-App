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
          backgroundColor: "lightgrey",
          textHeaderColor: "black",
          textDefaultColor: "black",
          selectedTextColor: "black",
          mainColor: "teal",
          textSecondaryColor: "darkblue",
          borderColor: "darkblue",
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
            <Text>Error: Both name and date of birth must be provided.</Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default AddPersonScreen;
