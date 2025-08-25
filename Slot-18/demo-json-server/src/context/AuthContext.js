import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem("auth_user");
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    });

    const login = async (username, password) => {
        // json-server: /users?username=...&password=...
        const res = await axios.get("http://localhost:3001/users", {
            params: { username, password }
        });
        if (Array.isArray(res.data) && res.data.length > 0) {
            const u = { id: res.data[0].id, username: res.data[0].username };
            setUser(u);
            localStorage.setItem("auth_user", JSON.stringify(u));
            return u;
        }
        throw new Error("Invalid username or password");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth_user");
    };

    const value = useMemo(() => ({ user, login, logout }), [user]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContext; 
