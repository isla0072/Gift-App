import React from "react";
import {
  Alert,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useData } from "../context/AppContext";
import { FAB } from "../components/FAB";
import Modal from "react-native-modal";

function IdeaScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { personId } = route.params;
  const { people, removeIdea } = useData();

  const person = people.find((p) => p.id === personId);
  const ideas = person ? person.ideas : [];

  const onDelete = async (ideaId) => {
    Alert.alert("Delete Idea", "Are you sure you want to delete this idea?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => removeIdea(personId, ideaId) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{person.name}'s Gift Ideas</Text>
      {!ideas.length && (
        <Text style={styles.emptyText}>No ideas saved yet. Add one!</Text>
      )}
      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => openImageModal(item.img)}>
              <Image
                style={styles.thumbnail}
                source={{ uri: item.img }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.ideaText}>{item.text}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <FAB
        title="+"
        onPress={() =>
          navigation.navigate("AddIdeaScreen", { personId: personId })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#9F9F9F",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  thumbnail: {
    width: 50,
    height: 75,
    borderRadius: 4,
  },
  ideaText: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    color: "#333333",
  },
  deleteButton: {
    backgroundColor: "#0587FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default IdeaScreen;
