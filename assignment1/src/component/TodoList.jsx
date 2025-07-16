import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
} from "react-native";

const TodoList = ({ todoList, setTodoList }) => {
    const [filter, setFilter] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const toggleComplete = (id) => {
        setTodoList(
            todoList.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const deleteTask = (id) => {
        setTodoList(todoList.filter((item) => item.id !== id));
    };

    const startEditing = (item) => {
        setEditingId(item.id);
        setEditingText(item.title);
    };

    const saveEdit = (id) => {
        if (editingText.trim() === "") {
            Alert.alert("Lỗi", "Nội dung không được để trống.");
            return;
        }

        setTodoList(
            todoList.map((item) =>
                item.id === id ? { ...item, title: editingText } : item
            )
        );
        setEditingId(null);
        setEditingText("");
    };

    const filteredList = todoList
        .filter((item) => {
            if (filter === "Completed") return item.completed;
            if (filter === "Incomplete") return !item.completed;
            return true;
        })
        .sort((a, b) => b.createdAt - a.createdAt);

    const renderItem = ({ item }) => (
        <View style={styles.taskItem}>
            {editingId === item.id ? (
                <>
                    <TextInput
                        style={[styles.taskText, { flex: 1 }]}
                        value={editingText}
                        onChangeText={setEditingText}
                        onSubmitEditing={() => saveEdit(item.id)}
                        returnKeyType="done"
                        autoFocus
                    />
                    <TouchableOpacity onPress={() => saveEdit(item.id)}>
                        <Text style={styles.editBtn}>💾</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text
                        style={[
                            styles.taskText,
                            item.completed && styles.completedTaskText,
                        ]}
                    >
                        {item.title}
                    </Text>

                    <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                        <Text style={styles.completeBtn}>
                            {item.completed ? "Undo" : "✓"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => startEditing(item)}>
                        <Text style={styles.editBtn}>edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteTask(item.id)}>
                        <Text style={styles.deleteBtn}>X</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.filterContainer}>
                {["All", "Completed", "Incomplete"].map((f) => (
                    <Button
                        key={f}
                        title={f}
                        onPress={() => setFilter(f)}
                        color={filter === f ? "#007AFF" : "#aaa"}
                    />
                ))}
            </View>

            <FlatList
                data={filteredList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Không có công việc nào</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    taskText: {
        fontSize: 16,
        flex: 1,
        color: "#333",
    },
    completedTaskText: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    completeBtn: {
        fontSize: 18,
        color: "#28a745",
        paddingHorizontal: 8,
    },
    editBtn: {
        fontSize: 18,
        color: "#007bff",
        paddingHorizontal: 8,
    },
    deleteBtn: {
        fontSize: 18,
        color: "#ff4444",
        paddingHorizontal: 8,
    },
    emptyText: {
        textAlign: "center",
        color: "#888",
        marginTop: 20,
        fontSize: 16,
        fontStyle: "italic",
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 10,
    },
});

export default TodoList;
