import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

function DataProvider(props) {
  const [people, setPeople] = useState([]);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("people_key").then((storedPeople) => {
      if (storedPeople) setPeople(JSON.parse(storedPeople));
    });
    AsyncStorage.getItem("ideas_key").then((storedIdeas) => {
      if (storedIdeas) setIdeas(JSON.parse(storedIdeas));
    });
  }, []);

  //person

  const addPerson = async (person) => {
    const updatedPeople = [...people, person];
    setPeople(updatedPeople);
    await AsyncStorage.setItem("people_key", JSON.stringify(updatedPeople));
  };

  const removePerson = async (personId) => {
    const updatedPeople = people.filter((p) => p.id !== personId);
    setPeople(updatedPeople);
    await AsyncStorage.setItem("people_key", JSON.stringify(updatedPeople));
  };

  //idea

  const addIdea = async (idea) => {
    const updatedIdeas = [...ideas, idea];
    setIdeas(updatedIdeas);
    await AsyncStorage.setItem("ideas_key", JSON.stringify(updatedIdeas));
  };

  const removeIdea = async (personId, ideaId) => {
    const updatedPeople = people.map((person) => {
      if (person.id === personId) {
        return {
          ...person,
          ideas: person.ideas.filter((idea) => idea.id !== ideaId),
        };
      }
      return person;
    });
    setPeople(updatedPeople);
    await AsyncStorage.setItem("people_key", JSON.stringify(updatedPeople));
  };

  const saveIdea = async (personId, newIdea) => {
    if (!newIdea.text || !newIdea.img) {
      return false;
    }
    const updatedPeople = people.map((person) =>
      person.id === personId
        ? { ...person, ideas: [...person.ideas, newIdea] }
        : person
    );
    setPeople(updatedPeople);
    await AsyncStorage.setItem("people_key", JSON.stringify(updatedPeople));
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        people,
        setPeople,
        addPerson,
        removePerson,
        ideas,
        setIdeas,
        addIdea,
        removeIdea,
        saveIdea,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

function useData() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Not inside the provider");
  }
  return context;
}

export { DataProvider, useData };
