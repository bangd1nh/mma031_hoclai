import React from "react";
import { View, Button, StyleSheet } from "react-native";

interface Props {
    sortOrder: "asc" | "desc";
    onSortChange: (order: "asc" | "desc") => void;
}

const ProductSortBar: React.FC<Props> = ({ sortOrder, onSortChange }) => (
    <View style={styles.container}>
        <Button
            title="Giá tăng dần"
            color={sortOrder === "asc" ? "#1976D2" : "#888"}
            onPress={() => onSortChange("asc")}
        />
        <Button
            title="Giá giảm dần"
            color={sortOrder === "desc" ? "#1976D2" : "#888"}
            onPress={() => onSortChange("desc")}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
});

export default ProductSortBar;
