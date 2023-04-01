import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const SignInScreen = () => {
  return (
    <View style={styles.container}>
        <Text>Login Screen</Text>
        <Button title="Sign In" onPress={() => alert("todo!") } />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
});