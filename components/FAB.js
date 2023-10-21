import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const FAB = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#0587FF",
    borderRadius: 28,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
  },
});
