import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useReducer, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-web";

function reducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: Date.now().toString(),
                    title: action.title,
                    completed: false,
                },
            ];
        case "TOGGLE":
            return state.map((task) =>
                task.id === action.id
                    ? { ...task, completed: !task.completed }
                    : task
            );
        case "DELETE":
            return state.filter((task) => task.id !== action.id);
        default:
            return state;
    }
}

export default function MainScreen({ navigation }) {
    const [tasks, dispatch] = useReducer(reducer, []);
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim()) {
            dispatch({ type: "ADD", title: input });
            setInput("");
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("password");
        navigation.replace("Login");
    };

    const renderItem = ({ item }) => (
        <View style={styles.taskContainer}>
            <Text
                style={[
                    styles.taskText,
                    item.completed && {
                        textDecorationLine: "line-through",
                        color: "gray",
                    },
                ]}
            >
                {item.title}
            </Text>
            <TouchableOpacity
                style={styles.completeBtn}
                onPress={() => dispatch({ type: "TOGGLE", id: item.id })}
            >
                <Text style={{ color: "white" }}>
                    {item.completed ? "Undo" : "Complete"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => dispatch({ type: "DELETE", id: item.id })}
            >
                <Text style={{ color: "white" }}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <Text style={styles.title}>Todo List</Text>

            <View style={styles.inputRow}>
                <TextInput
                    placeholder="Add new task"
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                />
                <Button title="Add" onPress={handleAdd} />
            </View>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={{ marginTop: 16 }}
            />
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={{ color: "white" }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        marginBottom: 16,
        textAlign: "center",
        marginTop: 20,
    },
    inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 8,
        padding: 8,
        borderRadius: 4,
    },
    taskContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    taskText: { flex: 1, fontSize: 16 },
    completeBtn: {
        backgroundColor: "green",
        padding: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    deleteBtn: { backgroundColor: "red", padding: 8, borderRadius: 4 },
    logoutBtn: {
        backgroundColor: "#333",
        padding: 8,
        borderRadius: 4,
        marginLeft: 8,
        height: 40,
        justifyContent: "center",
    },
});
