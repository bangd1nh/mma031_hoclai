import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { useAuth } from "../../context/AuthContext";

type LoginScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    "Login"
>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { register } = useAuth();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        } else {
            register(email, password);
            alert("Đăng ký thành công!");
            navigation.navigate("Login");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="#888"
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Đăng ký"
                    onPress={handleRegister}
                    color="#1976D2"
                />
            </View>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6fa",
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1976D2",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        width: "100%",
        maxWidth: 350,
        height: 44,
        borderColor: "#1976D2",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        backgroundColor: "#f0f4ff",
        fontSize: 16,
        color: "#222",
    },
    buttonContainer: {
        marginTop: 8,
        marginBottom: 16,
        borderRadius: 8,
        overflow: "hidden",
        width: "100%",
        maxWidth: 350,
    },
});
