import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';


const FavouritesContext = createContext(null);
export const useFavourites = () => useContext(FavouritesContext);


export default function FavouritesProvider({ children }) {
    const [ids, setIds] = useState(() => {
        try { return JSON.parse(localStorage.getItem('favs')) || []; } catch { return []; }
    });


    useEffect(() => { localStorage.setItem('favs', JSON.stringify(ids)); }, [ids]);


    const isFav = (id) => ids.includes(id);
    const toggleFav = (id) => setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);


    const value = useMemo(() => ({ ids, isFav, toggleFav, count: ids.length }), [ids]);


    return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}


FavouritesProvider.propTypes = { children: PropTypes.node };