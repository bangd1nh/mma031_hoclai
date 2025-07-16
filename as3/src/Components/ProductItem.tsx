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
                <Text>Không có ảnh</Text>
            </View>
        )}
        <View style={{ flex: 1 }}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDesc}>{product.description}</Text>
            <Text style={styles.productPrice}>Giá: {product.price}₫</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(product.id)}>
            <Text style={styles.deleteBtn}>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(product)}>
            <Text style={styles.editBtn}>Sửa</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    productCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
    imagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
    },
    productName: { fontSize: 18, fontWeight: "bold" },
    productDesc: { fontSize: 14, color: "#555" },
    productPrice: { fontSize: 16, color: "#1976D2", marginTop: 4 },
    deleteBtn: { color: "red", fontWeight: "bold", marginLeft: 8 },
    editBtn: { color: "#1976D2", fontWeight: "bold", marginLeft: 8 },
});

export default ProductItem;
