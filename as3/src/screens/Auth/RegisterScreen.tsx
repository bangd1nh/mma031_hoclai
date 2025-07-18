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
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuth();

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
        if (password.length < 6) {
            setError("Mật khẩu phải từ 6 ký tự");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            return false;
        }
        setError("");
        return true;
    };

    const handleRegister = () => {
        if (!validate()) return;
        register(email, password, fullName);
        setError("");
        alert("Đăng ký thành công!");
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Đăng ký</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />
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
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e3eafc",
        padding: 16,
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
        width: "100%",
        maxWidth: 350,
    },
    error: {
        color: "#e53935",
        marginBottom: 10,
        textAlign: "center",
        fontSize: 15,
    },
});
