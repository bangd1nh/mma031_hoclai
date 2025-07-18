import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useProduct } from "../../context/ProductContext";
import ProductList from "../../Components/ProductList";
import ProductForm from "../../Components/ProductForm";
import ProductSearchBar from "../../Components/ProductSearchBar";
import ProductSortBar from "../../Components/ProductSortBar";
import { Product } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";

const HomeScreen: React.FC = () => {
    const { products, addProduct, deleteProduct, updateProduct } = useProduct();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const { logout, user } = useAuth();

    const handleEdit = (product: Product) => setEditingProduct(product);

    const handleSubmit = (product: Omit<Product, "id">) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, product);
            setEditingProduct(null);
        } else {
            addProduct(product);
        }
    };

    const handleCancelEdit = () => setEditingProduct(null);

    const filteredProducts = () => {
        let result = products.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
        result = result.sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );
        return result;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách sản phẩm</Text>
            <Text style={styles.subTitle}>
                xin chào {user.fullName} email: {user.email}
            </Text>
            <ProductSearchBar value={search} onChange={setSearch} />
            <ProductSortBar sortOrder={sortOrder} onSortChange={setSortOrder} />
            <ProductList
                products={filteredProducts()}
                onDelete={deleteProduct}
                onEdit={handleEdit}
            />
            <ProductForm
                onSubmit={handleSubmit}
                editingProduct={editingProduct}
                onCancelEdit={handleCancelEdit}
            />
            <View style={{ marginTop: 10 }}>
                <Button title="đăng xuất" onPress={logout} color="#888" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f6fa",
        height: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    subTitle: {
        fontSize: 14,
        marginBottom: 16,
        textAlign: "center",
    },
});

export default HomeScreen;
