import React from "react";
import { FlatList, Text } from "react-native";
import { Product } from "../context/ProductContext";
import ProductItem from "./ProductItem";

interface Props {
    products: Product[];
    onDelete: (id: string) => void;
    onEdit: (product: Product) => void;
}

const ProductList: React.FC<Props> = ({ products, onDelete, onEdit }) => (
    <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <ProductItem product={item} onDelete={onDelete} onEdit={onEdit} />
        )}
        style={{ height: 120 }}
        ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
                Chưa có sản phẩm nào.
            </Text>
        }
    />
);

export default ProductList;
