import React, { createContext, useReducer } from "react";
export const FavouritesContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "TOGGLE":
            return state.some(i => i.id === action.item.id)
                ? state.filter(i => i.id !== action.item.id)
                : [...state, action.item];
        default:
            return state;
    }
}

export function FavouritesProvider({ children }) {
    const [favs, dispatch] = useReducer(reducer, []);
    const toggleFav = (item) => dispatch({ type: "TOGGLE", item });
    const isFav = (id) => favs.some(f => f.id === id);
    return <FavouritesContext.Provider value={{ favs, toggleFav, isFav }}>{children}</FavouritesContext.Provider>;
}
