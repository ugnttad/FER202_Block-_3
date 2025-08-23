import React, { createContext, useEffect, useMemo, useReducer } from "react";

export const WishlistContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "INIT": return new Set(action.ids || []);
        case "TOGGLE": {
            const next = new Set(state);
            const id = Number(action.id);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        }
        case "CLEAR": return new Set();
        default: return state;
    }
}

export function WishlistProvider({ children }) {
    const [ids, dispatch] = useReducer(reducer, new Set());

    // Load + migrate chuỗi -> số
    useEffect(() => {
        try {
            const raw = localStorage.getItem("wishlist_ids") || "[]";
            const parsed = JSON.parse(raw);
            const normalized = Array.isArray(parsed) ? parsed.map(Number).filter(Number.isFinite) : [];
            dispatch({ type: "INIT", ids: normalized });
        } catch {
            dispatch({ type: "INIT", ids: [] });
        }
    }, []);

    useEffect(() => {
        try { localStorage.setItem("wishlist_ids", JSON.stringify(Array.from(ids))); } catch { }
    }, [ids]);

    const toggle = (id) => dispatch({ type: "TOGGLE", id });
    const clear = () => dispatch({ type: "CLEAR" });
    const has = (id) => ids.has(Number(id));
    const count = useMemo(() => ids.size, [ids]);

    return (
        <WishlistContext.Provider value={{ ids, toggle, has, count, clear }}>
            {children}
        </WishlistContext.Provider>
    );
}
