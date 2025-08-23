import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // Kiểm tra qua API thay vì import file users.js
    const res = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
    const users = await res.json();
    if (users.length > 0) {
      setUser({
        username: users[0].username,
        displayName: users[0].displayName,
        role: users[0].role
      });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
