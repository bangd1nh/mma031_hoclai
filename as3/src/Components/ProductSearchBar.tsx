import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
    value: string;
    onChange: (text: string) => void;
}

const ProductSearchBar: React.FC<Props> = ({ value, onChange }) => (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Tìm kiếm sản phẩm..."
            value={value}
            onChangeText={onChange}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    input: {
        height: 40,
        borderColor: "#1976D2",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#f0f4ff",
        fontSize: 15,
        color: "#222",
    },
});

export default ProductSearchBar;
