import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
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
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        login(email, password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Đăng nhập</Text>
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
                    Chưa có tài khoản? Đăng ký
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
        backgroundColor: "#f5f6fa",
    },
    form: {
        width: "90%",
        maxWidth: 350,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
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
    },
    registerText: {
        color: "#1976D2",
        textAlign: "center",
        textDecorationLine: "underline",
        fontSize: 15,
        marginTop: 8,
    },
});

export default LoginScreen;
