import React, { useContext, useMemo, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { vnd } from "../../utils/format";

export default function Checkout() {
    const { cart, total, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const isEmpty = useMemo(() => cart.length === 0, [cart.length]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2200);
        return () => clearTimeout(t);
    }, [toast]);

    const placeOrder = async () => {
        if (isEmpty) return;
        const order = {
            userId: user ? user.id : 0,
            items: cart.map(it => ({ id: it.id, title: it.title, price: it.price, qty: it.qty, image: it.image })),
            total,
            date: new Date().toISOString()
        };
        await fetch("http://localhost:3001/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });
        clearCart();
        setToast({ type: "success", msg: "Đặt hàng thành công!" });
        setTimeout(() => navigate("/", { replace: true }), 900);
    };

    return (
        <div className="container py-4">
            {toast && (
                <Alert variant={toast.type} className="position-fixed top-0 end-0 m-4" style={{ zIndex: 9999 }}>
                    {toast.msg}
                </Alert>
            )}

            <h3 className="mb-3">Checkout</h3>
            {isEmpty ? (
                <div className="alert alert-info">Giỏ hàng trống.</div>
            ) : (
                <>
                    <ul className="list-group mb-3">
                        {cart.map(it => (
                            <li key={it.id} className="list-group-item d-flex justify-content-between">
                                <div>
                                    <div className="fw-semibold">{it.title}</div>
                                    <small className="text-muted">{vnd(it.price)} x {it.qty}</small>
                                </div>
                                <div className="fw-bold">{vnd(it.price * it.qty)}</div>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="fw-semibold">Tổng cộng</span>
                            <span className="fw-bold text-success">{vnd(total)}</span>
                        </li>
                    </ul>
                    <button className="btn btn-success" onClick={placeOrder}>Đặt hàng</button>
                </>
            )}
        </div>
    );
}
