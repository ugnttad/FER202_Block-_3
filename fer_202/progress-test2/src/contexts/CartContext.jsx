import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';


const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);


export default function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
    });


    useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)); }, [items]);


    function addToCart(product, qty = 1) {
        setItems(prev => {
            const i = prev.findIndex(x => x.id === product.id);
            if (i >= 0) {
                const cp = [...prev];
                cp[i] = { ...cp[i], qty: cp[i].qty + qty };
                return cp;
            }
            return [...prev, { id: product.id, name: product.name || product.title, price: Number(product.price) || 0, image: product.image, qty }];
        });
    }
    function removeFromCart(id) { setItems(prev => prev.filter(x => x.id !== id)); }
    function clearCart() { setItems([]); }
    const totalItems = items.reduce((s, it) => s + it.qty, 0);
    const totalPrice = items.reduce((s, it) => s + it.qty * Number(it.price || 0), 0);


    const value = useMemo(() => ({ items, addToCart, removeFromCart, clearCart, totalItems, totalPrice }), [items, totalItems, totalPrice]);


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


CartProvider.propTypes = { children: PropTypes.node };