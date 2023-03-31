import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const HomeScreen = ({ navigation }) => (
    <View style={styles.container}>
      <View style={styles.homeItem}>
        <Text style={styles.textStyle}>FiuFit</Text>
      </View>
      <View style={styles.homeItem}>
        <Button title="Sign In" onPress={() => navigation.push('SignIn') } />
      </View>
      <View style={styles.homeItem}>
        <Button title="Create Account" onPress={() => navigation.push('SignUp')} />
      </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    homeItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        color: 'black',
        fontSize: 50,
        fontWeight: 'bold'
    }
});