import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Product } from "../context/ProductContext";

interface Props {
    onSubmit: (product: Omit<Product, "id">) => void;
    editingProduct: Product | null;
    onCancelEdit: () => void;
}

const ProductForm: React.FC<Props> = ({
    onSubmit,
    editingProduct,
    onCancelEdit,
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name);
            setDescription(editingProduct.description);
            setPrice(editingProduct.price.toString());
            setImage(editingProduct.image || "");
        } else {
            setName("");
            setDescription("");
            setPrice("");
            setImage("");
        }
        setError("");
    }, [editingProduct]);

    const validate = () => {
        if (!name.trim()) {
            setError("Vui lòng nhập tên sản phẩm");
            return false;
        }
        if (!description.trim()) {
            setError("Vui lòng nhập mô tả");
            return false;
        }
        if (!price || isNaN(Number(price)) || Number(price) <= 0) {
            setError("Giá phải là số lớn hơn 0");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onSubmit({ name, description, price: Number(price), image });
    };

    return (
        <View style={styles.form}>
            <Text style={styles.formTitle}>
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Tên sản phẩm"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Mô tả"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Giá"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="URL ảnh (tùy chọn)"
                value={image}
                onChangeText={setImage}
            />
            <Button
                title={editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                onPress={handleSubmit}
                color="#1976D2"
            />
            {editingProduct && (
                <Button
                    title="Hủy chỉnh sửa"
                    onPress={onCancelEdit}
                    color="#888"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginTop: 24,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 8,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 14,
        color: "#1976D2",
    },
    input: {
        height: 44,
        borderColor: "#1976D2",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 12,
        backgroundColor: "#f0f4ff",
        fontSize: 16,
        color: "#222",
    },
    error: {
        color: "#e53935",
        marginBottom: 10,
        textAlign: "center",
        fontSize: 15,
    },
});

export default ProductForm;
