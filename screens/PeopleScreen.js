import React from "react";
import {
  Alert,
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../context/AppContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";

function PeopleScreen() {
  const navigation = useNavigation();
  const { people, removePerson } = useData();

  const onRemovePerson = async (personId) => {
    Alert.alert(
      "Delete Person",
      "Are you sure you want to delete this person?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await removePerson(personId);
          },
        },
      ]
    );
  };
  const renderRightActions = (personId, progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <RectButton
        onPress={() => onRemovePerson(personId)}
        style={styles.rightAction}
      >
        <Animated.View
          style={[styles.actionText, { transform: [{ scale: scale }] }]}
        >
          <Icon name="trash" size={20} color="#FFF" />
        </Animated.View>
      </RectButton>
    );
  };

  const formatDate = (dob) => {
    let formattedDate = "No date was set";
    if (dob) {
      const correctedDob = dob.replace(/\//g, "-");
      const dateObj = new Date(correctedDob + "T00:00:00Z");
      dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
      const isoDate = dateObj.toISOString();

      const month = new Intl.DateTimeFormat("default", {
        month: "long",
      }).format(dateObj);
      const day = new Intl.DateTimeFormat("default", { day: "numeric" }).format(
        dateObj
      );

      formattedDate = `${month} ${day}`;
    }
    return formattedDate;
  };

  const navigateToIdeaScreen = (personId) => {
    navigation.navigate("IdeaScreen", { personId: personId });
  };

  const sortedPeople = [...people].sort((a, b) => {
    const aDate = new Date(a.dob);
    const bDate = new Date(b.dob);

    const aKey = aDate.getMonth() * 100 + aDate.getDate();
    const bKey = bDate.getMonth() * 100 + bDate.getDate();

    return aKey - bKey;
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add Person"
          onPress={() => navigation.navigate("AddPersonScreen")}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>A PEOPLE LIST</Text>
      {!sortedPeople.length && (
        <Text style={styles.head}>No people saved yet</Text>
      )}
      <FlatList
        data={sortedPeople}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const formattedDate = formatDate(item.dob);
          return (
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(item.id, progress, dragX)
              }
            >
              <View style={styles.item}>
                <Text style={styles.head}>
                  {item.name} - {formattedDate}
                </Text>
                <View style={styles.iconContainer}>
                  <Icon
                    name="lightbulb-o"
                    size={30}
                    color="#0587FF"
                    onPress={() => navigateToIdeaScreen(item.id)}
                  />
                </View>
              </View>
            </Swipeable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#F9F9F9",
  },
  message: {
    fontSize: 26,
    fontWeight: "700",
    margin: 25,
    color: "#333333",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  head: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightAction: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    borderRadius: 12,
    marginRight: 8,
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
    padding: 10,
  },
});

export default PeopleScreen;
