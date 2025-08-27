import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';


const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);


export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');


    useEffect(() => {
        localStorage.setItem('theme', theme);
        // Apply to <html> and body for easy theming
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
    }, [theme]);


    const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
    const value = useMemo(() => ({ theme, setTheme, toggle, isDark: theme === 'dark' }), [theme]);


    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}