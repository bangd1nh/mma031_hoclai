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
    }, [editingProduct]);

    const handleSubmit = () => {
        if (!name || !description || !price) return;
        onSubmit({ name, description, price: Number(price), image });
    };

    return (
        <View style={styles.form}>
            <Text style={styles.formTitle}>
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </Text>
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
        borderRadius: 10,
        padding: 16,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    formTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
    input: {
        height: 40,
        borderColor: "#1976D2",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "#f0f4ff",
        fontSize: 15,
        color: "#222",
    },
});

export default ProductForm;
