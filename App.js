import { useFonts } from "expo-font";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";
import { DataProvider } from "./context/AppContext";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./gluestack.config";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GluestackUIProvider config={config}>
      <DataProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="PeopleScreen">
            <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
            <Stack.Screen name="AddPersonScreen" component={AddPersonScreen} />
            <Stack.Screen name="IdeaScreen" component={IdeaScreen} />
            <Stack.Screen name="AddIdeaScreen" component={AddIdeaScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DataProvider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
