import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
    register: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" });

    const login = (email: string, password: string) => {
        if (email === "admin@admin.com" && password === "admin") {
            setIsLoggedIn(true);
        }
        if (email === user.email && password === user.password) {
            setIsLoggedIn(true);
        }
    };

    const logout = () => {
        // Clear user session, etc.
        setIsLoggedIn(false);
    };

    const register = (email: string, password: string) => {
        setUser({ email: email, password: password });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
