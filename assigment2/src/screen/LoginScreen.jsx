import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        const autoLogin = async () => {
            const savedUsername = await AsyncStorage.getItem("username");
            const savedPassword = await AsyncStorage.getItem("password");
            if (savedUsername && savedPassword) {
                navigation.replace("Main");
            }
        };
        autoLogin();
    }, []);

    const handleLogin = async () => {
        if (username.trim() && password.trim()) {
            if (remember) {
                await AsyncStorage.setItem("username", username);
                await AsyncStorage.setItem("password", password);
            } else {
                await AsyncStorage.removeItem("username");
                await AsyncStorage.removeItem("password");
            }
            navigation.replace("Main");
        } else {
            Alert.alert(
                "Login failed",
                "Username and password cannot be empty"
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Username"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.checkboxContainer}>
                <Checkbox value={remember} onValueChange={setRemember} />
                <Text style={styles.label}>Remember Password</Text>
            </View>
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24 },
    title: { fontSize: 32, marginBottom: 24, textAlign: "center" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    label: { marginLeft: 8 },
});
