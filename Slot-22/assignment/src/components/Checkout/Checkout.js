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

    const isEmpty = useMemo(() => cart.length === 0, [cart.length]);
    const [toast, setToast] = useState(null);
    const [isPlacing, setIsPlacing] = useState(false);

    // Auto-hide toast sau 2.2s
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2200);
        return () => clearTimeout(t);
    }, [toast]);

    const placeOrder = async () => {
        if (isEmpty || isPlacing) return;
        setIsPlacing(true);

        try {
            const order = {
                userId: user?.id ?? 0,
                items: cart.map(it => ({
                    id: it.id, title: it.title, price: it.price, qty: it.qty, image: it.image
                })),
                total,
                date: new Date().toISOString()
            };

            const res = await fetch("http://localhost:3001/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order)
            });

            if (!res.ok) throw new Error("ORDER_FAILED");

            clearCart();
            setToast({ type: "success", msg: "Đặt hàng thành công!" });

            // Đợi toast hiển thị rồi mới về trang chủ
            setTimeout(() => navigate("/", { replace: true }), 2200);
        } catch (e) {
            setToast({ type: "danger", msg: "Có lỗi khi đặt hàng. Vui lòng thử lại!" });
            setIsPlacing(false);
        }
    };

    return (
        <div className="container py-4">
            {toast && (
                <Alert
                    variant={toast.type}
                    className="position-fixed top-0 end-0 m-4"
                    style={{ zIndex: 9999, minWidth: 260 }}
                    onClose={() => setToast(null)}
                    dismissible
                >
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
                                    <small className="text-muted">
                                        {vnd(it.price)} × {it.qty}
                                    </small>
                                </div>
                                <div className="fw-bold">{vnd(it.price * it.qty)}</div>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="fw-semibold">Tổng cộng</span>
                            <span className="fw-bold text-success">{vnd(total)}</span>
                        </li>
                    </ul>

                    <button
                        className="btn btn-success"
                        onClick={placeOrder}
                        disabled={isPlacing}
                    >
                        {isPlacing ? "Đang xử lý..." : "Đặt hàng"}
                    </button>
                </>
            )}
        </div>
    );
}
