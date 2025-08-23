import React, { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("auth_user") || "null"); } catch { return null; }
  });
  const [redirectAfterLogin, setRedirectAfterLogin] = useState("/");

  useEffect(() => {
    try {
      if (user) localStorage.setItem("auth_user", JSON.stringify(user));
      else localStorage.removeItem("auth_user");
    } catch { }
  }, [user]);

  const login = async (email, password) => {
    const res = await fetch(`http://localhost:3001/accounts?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      const u = data[0];
      setUser({ id: u.id, name: u.name, username: u.username, email: u.email, role: u.role || "user" });
      return true;
    }
    return false;
  };

  const register = async (payload) => {
    const res = await fetch("http://localhost:3001/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const u = await res.json();
    if (u && u.id) {
      setUser({ id: u.id, name: u.name, username: u.username, email: u.email, role: u.role || "user" });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({
    user, login, logout, register, redirectAfterLogin, setRedirectAfterLogin
  }), [user, redirectAfterLogin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
