import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
    sortOrder: "asc" | "desc";
    onSortChange: (order: "asc" | "desc") => void;
}

const ProductSortBar: React.FC<Props> = ({ sortOrder, onSortChange }) => (
    <View style={styles.container}>
        <TouchableOpacity
            style={[styles.sortBtn, sortOrder === "asc" && styles.activeBtn]}
            onPress={() => onSortChange("asc")}
        >
            <Text
                style={[
                    styles.sortText,
                    sortOrder === "asc" && styles.activeText,
                ]}
            >
                Giá tăng dần
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.sortBtn, sortOrder === "desc" && styles.activeBtn]}
            onPress={() => onSortChange("desc")}
        >
            <Text
                style={[
                    styles.sortText,
                    sortOrder === "desc" && styles.activeText,
                ]}
            >
                Giá giảm dần
            </Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    sortBtn: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: "#e3eafc",
        marginHorizontal: 6,
    },
    activeBtn: {
        backgroundColor: "#1976D2",
    },
    sortText: {
        color: "#1976D2",
        fontWeight: "bold",
        fontSize: 15,
    },
    activeText: {
        color: "#fff",
    },
});

export default ProductSortBar;
