import { useState } from "react";
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import TodoList from "../component/TodoList";

const MainScreen = () => {
    const [task, setTask] = useState("");
    const [todoList, setTodoList] = useState([]);
    const addTask = () => {
        if (task.trim() !== "") {
            setTodoList([
                ...todoList,
                { id: Date.now().toString(), title: task },
            ]);
            setTask("");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập việc cần làm..."
                    value={task}
                    onChangeText={setTask}
                    style={styles.input}
                />
                <Button title="Thêm" onPress={addTask} />
            </View>
            <TodoList todoList={todoList} setTodoList={setTodoList} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginRight: 10,
        padding: 10,
    },
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    taskText: { fontSize: 16 },
    deleteBtn: { color: "red", fontWeight: "bold" },
});
export default MainScreen;
