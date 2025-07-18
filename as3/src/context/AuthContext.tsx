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
    register: (email: string, password: string, fullName: string) => void;
    loginError: boolean;
    user: { fullName: string; email: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        email: "admin@admin.com",
        password: "admin",
        fullName: "admin",
    });
    const [loginError, setLoginError] = useState(false);

    const login = (email: string, password: string) => {
        if (email === user.email && password === user.password) {
            setIsLoggedIn(true);
        }
        setLoginError(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    const register = (email: string, password: string, fullName: string) => {
        setUser({ email: email, password: password, fullName: fullName });
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, login, logout, register, loginError, user }}
        >
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
