import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity, ImageBackground } from "react-native";
import { useData } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { randomUUID } from "expo-crypto";
import { SafeAreaView } from "react-native-safe-area-context";

function AddIdeaScreen({ route }) {
  const { personId } = route.params;
  const { saveIdea } = useData();
  const [ideaText, setIdeaText] = useState("");
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const aspectRatio = 2 / 3;
  const imageWidth = screenWidth * 0.6;
  const imageHeight = imageWidth * aspectRatio;
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleTakePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data.uri);
      setPreviewVisible(true);
      setCapturedImage(data);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleSaveIdea = async () => {
    try {
      const newIdea = {
        id: await randomUUID(),
        text: ideaText,
        img: image,
        width: imageWidth,
        height: imageHeight,
      };
      const isSuccess = await saveIdea(personId, newIdea);

      if (isSuccess) {
        navigation.navigate("IdeaScreen", { personId: personId });
      } else {
        console.error("Failed to save the idea");
      }
    } catch (error) {
      console.error("Error saving idea:", error);
    }
  };

  const isDataValid = () => ideaText && image;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Gift Idea"
          value={ideaText}
          onChangeText={setIdeaText}
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView behavior="padding" style={styles.cameraContainer}>
        {hasPermission === null ? (
          <Text>Waiting for permission</Text>
        ) : hasPermission === false ? (
          <Text>No access to camera</Text>
        ) : previewVisible && capturedImage ? (
          <CameraPreview photo={capturedImage} />
        ) : (
          <Camera
            ref={cameraRef}
            style={{ width: imageWidth, height: imageHeight }}
            onCameraReady={() => setIsCameraReady(true)}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "transparent",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  flexDirection: "row",
                  flex: 1,
                  width: "100%",
                  padding: 20,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    alignSelf: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={handleTakePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: "#fff",
                    }}
                  />
                </View>
              </View>
            </View>
          </Camera>
        )}
      </KeyboardAvoidingView>

      <KeyboardAvoidingView behavior="padding" style={styles.buttonContainer}>
        <Button
          title="Save"
          onPress={handleSaveIdea}
          disabled={!isDataValid()}
        />
        <Button
          title="Cancel"
          onPress={() =>
            navigation.navigate("IdeaScreen", { personId: personId })
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const CameraPreview = ({ photo }) => {
  return (
    <SafeAreaView>
      <View style={styles.previewContainer}>
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={styles.imageBackground}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  cameraContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  previewContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  imageBackground: {
    width: "100%",
    aspectRatio: 3 / 3,
  },
});

export default AddIdeaScreen;
