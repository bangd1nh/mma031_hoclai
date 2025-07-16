import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { ProductProvider } from "./src/context/ProductContext";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <ProductProvider>
                <AppNavigator />
            </ProductProvider>
        </AuthProvider>
    );
};

export default App;
