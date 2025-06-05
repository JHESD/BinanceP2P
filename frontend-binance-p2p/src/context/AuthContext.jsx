import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (err) {
        console.error("Error al decodificar el token:", err);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        const isAdmin = localStorage.getItem("isAdmin") === "true";

        if (!token) return null;

        const decoded = parseJwt(token);
        const userId = decoded?.userId;

        return userId ? { token, userId, isAdmin } : null;
    });

    const login = (token, isAdmin) => {
        const decoded = parseJwt(token);
        const userId = decoded?.userId;

        if (!userId) {
            console.error("Token inválido: no contiene userId");
            return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", isAdmin);
        setUser({ token, userId, isAdmin });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
