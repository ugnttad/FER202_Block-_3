import React, { useContext, useState } from "react";
import { Container, Table, Button, Image, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

// helpers hiển thị giá
const toNumber = (v) =>
    typeof v === "number" ? v : Number(String(v || "").replace(/[^\d]/g, "")) || 0;
const formatVND = (v) => toNumber(v).toLocaleString("vi-VN") + "đ";
const unitPriceOf = (p) =>
    p?.unitPrice ??
    p?.currentPrice ??
    p?.salePrice ??
    p?.price ??
    p?.newPrice ??
    p?.gia ??
    p?.giaKM ??
    0;

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, total, clearCart } =
        useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) return navigate("/login?redirect=/checkout");
        navigate("/checkout");
    };

    return (
        <Container className="my-4" style={{ maxWidth: 900 }}>
            {alert && (
                <Alert
                    variant={alert.type}
                    onClose={() => setAlert(null)}
                    dismissible
                    className="position-fixed top-0 end-0 m-4"
                    style={{ zIndex: 9999, minWidth: 240 }}
                >
                    {alert.msg}
                </Alert>
            )}

            <div className="card shadow rounded-4">
                <div className="card-body">
                    <h3 className="text-success mb-4">Giỏ hàng</h3>

                    {cart.length === 0 && (
                        <Alert
                            variant="secondary"
                            className="d-flex justify-content-between align-items-center"
                        >
                            <span>Giỏ hàng trống</span>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => navigate("/products")}
                            >
                                Tiếp tục mua hàng
                            </Button>
                        </Alert>
                    )}

                    {cart.length > 0 && (
                        <>
                            <Table hover responsive className="align-middle">
                                <thead>
                                    <tr>
                                        <th>Ảnh</th>
                                        <th>Tên món</th>
                                        <th style={{ width: 120 }}>Số lượng</th>
                                        <th>Giá</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <Image
                                                    src={`/images/${item.image}`}
                                                    alt={item.name}
                                                    width={60}
                                                    height={60}
                                                    rounded
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </td>
                                            <td>
                                                <b>{item.name}</b>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={item.quantity}
                                                    className="form-control"
                                                    style={{ width: 80 }}
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            item.id,
                                                            Math.max(1, Number(e.target.value || 1))
                                                        )
                                                    }
                                                />
                                            </td>
                                            {/* >>> GIÁ: luôn có giá nhờ unitPriceOf() <<< */}
                                            <td>{formatVND(unitPriceOf(item))}</td>
                                            <td>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <i className="bi bi-trash" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => navigate("/products")}
                                    >
                                        Tiếp tục mua hàng
                                    </Button>
                                </div>

                                <div className="text-end">
                                    <div className="fw-bold fs-5 text-success mb-2">
                                        Tổng tiền: {total.toLocaleString("vi-VN")}đ
                                    </div>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Button variant="outline-secondary" onClick={clearCart}>
                                            Xoá toàn bộ
                                        </Button>
                                        <Button variant="success" onClick={handleCheckout}>
                                            <i className="bi bi-credit-card me-2"></i>Thanh toán
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
}
