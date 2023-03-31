import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const SignUpScreen = () => { 
    return (
      <View style={styles.container}>
        <Text>Create Account Screen</Text>
        <Button title="Sign Up" onPress={() => alert("todo!") } />
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