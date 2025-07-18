import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

type LoginScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    "Login"
>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { login, loginError } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validate = () => {
        if (!email.trim()) {
            setError("Vui lòng nhập email");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Email không hợp lệ");
            return false;
        }
        if (!password) {
            setError("Vui lòng nhập mật khẩu");
            return false;
        }
        setError("");
        return true;
    };

    const handleLogin = () => {
        if (!validate()) return;
        login(email, password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Đăng nhập</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {loginError ? (
                    <Text style={styles.error}>sai mật khẩu hoặc email</Text>
                ) : null}
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
                <View style={styles.buttonContainer}>
                    <Button
                        title="Đăng nhập"
                        onPress={handleLogin}
                        color="#1976D2"
                    />
                </View>
                <Text
                    style={styles.registerText}
                    onPress={() => navigation.navigate("Register")}
                >
                    Chưa có tài khoản?{" "}
                    <Text style={{ fontWeight: "bold" }}>Đăng ký</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e3eafc",
    },
    form: {
        width: "90%",
        maxWidth: 350,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 28,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#1976D2",
        marginBottom: 18,
        textAlign: "center",
        letterSpacing: 1,
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#1976D2",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 14,
        paddingHorizontal: 14,
        backgroundColor: "#f0f4ff",
        fontSize: 17,
        color: "#222",
    },
    buttonContainer: {
        marginTop: 8,
        marginBottom: 16,
        borderRadius: 10,
        overflow: "hidden",
    },
    registerText: {
        color: "#1976D2",
        textAlign: "center",
        textDecorationLine: "underline",
        fontSize: 16,
        marginTop: 10,
    },
    error: {
        color: "#e53935",
        marginBottom: 10,
        textAlign: "center",
        fontSize: 15,
    },
});

export default LoginScreen;
