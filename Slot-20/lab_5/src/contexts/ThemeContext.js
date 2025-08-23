// src/contexts/ThemeContext.js
import React, { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext();

const initialTheme = () => {
    try {
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
    } catch { }
    return "light";
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        // Cho CSS custom
        document.body.dataset.theme = theme;
        // Cho Bootstrap 5.3 (màu nav, dropdown, btn…)
        document.documentElement.setAttribute("data-bs-theme", theme);
        // Lưu lại
        try { localStorage.setItem("theme", theme); } catch { }
    }, [theme]);

    const value = useMemo(
        () => ({ theme, toggle: () => setTheme(t => (t === "light" ? "dark" : "light")) }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
