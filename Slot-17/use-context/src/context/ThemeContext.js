import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem("theme-mode") || "light");

  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
    // Bootstrap 5.3 color mode via data-bs-theme
    document.documentElement.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));

  const value = useMemo(() => ({ mode, toggle }), [mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
