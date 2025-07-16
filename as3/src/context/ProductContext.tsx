import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
}

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (id: string, product: Omit<Product, "id">) => void;
    deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const initialProducts: Product[] = [
        {
            id: "1",
            name: "iPhone 15 Pro Max",
            description: "Điện thoại cao cấp nhất của Apple với chip A17 Pro.",
            price: 33990000,
            image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__5_2_1_1.jpg",
        },
        {
            id: "2",
            name: "Samsung Galaxy S24 Ultra",
            description: "Siêu phẩm Android đến từ Samsung với bút S Pen.",
            price: 32990000,
            image: "https://thetekcoffee.com/wp-content/uploads/2024/09/samsung-galaxy-s24-ultra-han-quoc.png",
        },
        {
            id: "3",
            name: "Xiaomi 14",
            description:
                "Smartphone cao cấp với camera Leica và hiệu năng mạnh mẽ.",
            price: 22990000,
            image: "https://product.hstatic.net/200000547447/product/xiaomi-14-tra_f90a6615fa7247bd8d23b6717d093491.png",
        },
        {
            id: "4",
            name: "OPPO Find X7 Ultra",
            description: "Camera hàng đầu và thiết kế cao cấp từ OPPO.",
            price: 27990000,
            image: "https://sonpixel.vn/wp-content/uploads/2024/07/oppo-find-x7-ultra-13.webp",
        },
        {
            id: "5",
            name: "vivo X100 Pro",
            description:
                "Camera ZEISS và hiệu năng vượt trội với chip Dimensity 9300.",
            price: 25990000,
            image: "https://cdn.xtmobile.vn/vnt_upload/product/11_2023/thumbs/(600x600)_crop_vivo-x100-pro-12gb-256gb-xtmobile.jpg",
        },
        {
            id: "6",
            name: "realme GT 6",
            description:
                "Hiệu năng mạnh mẽ với chip Snapdragon 8s Gen 3 và màn hình AMOLED 120Hz.",
            price: 14990000,
            image: "https://cdn.viettablet.com/images/detailed/61/realme-gt-neo6-se-1_lyas-2y.jpg",
        },
    ];

    const [products, setProducts] = useState<Product[]>(initialProducts);

    const addProduct = (product: Omit<Product, "id">) => {
        const newProduct = { ...product, id: Date.now().toString() };
        setProducts((prev) => [...prev, newProduct]);
    };

    const updateProduct = (id: string, product: Omit<Product, "id">) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...product, id } : p))
        );
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider
            value={{ products, addProduct, updateProduct, deleteProduct }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context)
        throw new Error("useProduct must be used within a ProductProvider");
    return context;
};
