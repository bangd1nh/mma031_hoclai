import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Product } from "../context/ProductContext";

interface Props {
    product: Product;
    onDelete: (id: string) => void;
    onEdit: (product: Product) => void;
}

const ProductItem: React.FC<Props> = ({ product, onDelete, onEdit }) => (
    <View style={styles.productCard}>
        {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} />
        ) : (
            <View style={styles.imagePlaceholder}>
                <Text style={{ color: "#888" }}>Không có ảnh</Text>
            </View>
        )}
        <View style={{ flex: 1 }}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDesc}>{product.description}</Text>
            <Text style={styles.productPrice}>
                Giá: {product.price.toLocaleString()}₫
            </Text>
        </View>
        <TouchableOpacity
            onPress={() => onEdit(product)}
            style={styles.actionBtn}
        >
            <Text style={styles.editBtn}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onDelete(product.id)}
            style={styles.actionBtn}
        >
            <Text style={styles.deleteBtn}>Xóa</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    productCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },
    image: { width: 60, height: 60, borderRadius: 10, marginRight: 14 },
    imagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 14,
        backgroundColor: "#f0f4ff",
        justifyContent: "center",
        alignItems: "center",
    },
    productName: { fontSize: 18, fontWeight: "bold", color: "#1976D2" },
    productDesc: { fontSize: 14, color: "#555", marginTop: 2 },
    productPrice: {
        fontSize: 16,
        color: "#388e3c",
        marginTop: 6,
        fontWeight: "bold",
    },
    actionBtn: { marginLeft: 8 },
    deleteBtn: { color: "#e53935", fontWeight: "bold", fontSize: 15 },
    editBtn: { color: "#1976D2", fontWeight: "bold", fontSize: 15 },
});

export default ProductItem;
