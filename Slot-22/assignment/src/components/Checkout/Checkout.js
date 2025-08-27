import React, { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { vnd } from "../../utils/format";

export default function Checkout() {
    const { cart, total, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const isEmpty = useMemo(() => cart.length === 0, [cart.length]);

    // Toast + submit state
    const [toast, setToast] = useState(null);
    const [isPlacing, setIsPlacing] = useState(false);

    // Customer info
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        note: "",
    });

    // Payment method
    const [payment, setPayment] = useState({
        method: "cod", // 'cod' | 'bank' | 'card'
        cardName: "",
        cardNumber: "",
        exp: "",
        cvv: "",
    });

    // Prefill from account & localStorage (if any)
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("checkout_info") || "null");
            if (saved) {
                setForm((f) => ({ ...f, ...saved.form }));
                setPayment((p) => ({ ...p, ...saved.payment }));
            }
        } catch { }

        let cancelled = false;
        (async () => {
            try {
                if (!user?.id) return;
                const res = await fetch(`http://localhost:3001/accounts/${user.id}`);
                if (!res.ok) return;
                const acc = await res.json();
                if (!cancelled && acc) {
                    setForm((f) => ({
                        ...f,
                        name: f.name || acc.name || "",
                        email: f.email || acc.email || "",
                    }));
                }
            } catch { }
        })();
        return () => { cancelled = true; };
    }, [user?.id]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2200);
        return () => clearTimeout(t);
    }, [toast]);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const onPayChange = (e) => setPayment({ ...payment, [e.target.name]: e.target.value });

    // Simple validation (demo)
    const validate = () => {
        if (!form.name.trim()) return "Please enter your full name.";
        if (!/^\+?\d{8,15}$/.test(form.phone.trim())) return "Invalid phone number.";
        if (!form.email.includes("@")) return "Invalid email.";
        if (!form.address.trim()) return "Please enter your address.";
        if (!form.city.trim()) return "Please enter your city/province.";
        if (!payment.method) return "Please choose a payment method.";
        if (payment.method === "card") {
            if (!/^\d{12,19}$/.test(payment.cardNumber.replace(/\s+/g, ""))) return "Invalid card number.";
            if (!/^\d{2}\/\d{2}$/.test(payment.exp)) return "Invalid expiry (MM/YY).";
            if (!/^\d{3,4}$/.test(payment.cvv)) return "Invalid CVV.";
        }
        return "";
    };

    const placeOrder = async () => {
        if (isEmpty || isPlacing) return;
        const err = validate();
        if (err) {
            setToast({ type: "danger", msg: err });
            return;
        }

        setIsPlacing(true);

        // Save for next time (no CVV)
        try {
            localStorage.setItem(
                "checkout_info",
                JSON.stringify({ form, payment: { ...payment, cvv: "" } })
            );
        } catch { }

        try {
            const order = {
                userId: user?.id ?? 0,
                items: cart.map((it) => ({
                    id: it.id,
                    title: it.title,
                    price: it.price,
                    qty: it.qty,
                    image: it.image,
                })),
                total,
                date: new Date().toISOString(),
                status: "pending",
                shipping: {
                    name: form.name.trim(),
                    phone: form.phone.trim(),
                    email: form.email.trim(),
                    address: form.address.trim(),
                    city: form.city.trim(),
                    note: form.note.trim(),
                },
                payment: {
                    method: payment.method,
                    paid: false,
                    last4: payment.method === "card"
                        ? payment.cardNumber.replace(/\s+/g, "").slice(-4)
                        : null,
                    transactionId: null,
                },
            };

            const res = await fetch("http://localhost:3001/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order),
            });

            if (!res.ok) throw new Error("ORDER_FAILED");

            clearCart();
            setToast({ type: "success", msg: "Order placed successfully!" });
            setTimeout(() => navigate("/", { replace: true }), 2200);
        } catch (e) {
            setToast({ type: "danger", msg: "There was an error placing your order. Please try again!" });
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
                <div className="alert alert-info">Your cart is empty.</div>
            ) : (
                <Row className="g-4">
                    {/* Customer info + payment */}
                    <Col lg={7}>
                        <Card className="p-3 rounded-4 shadow-sm">
                            <h5 className="mb-3">Customer information</h5>
                            <Form>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Full name</Form.Label>
                                            <Form.Control
                                                name="name"
                                                value={form.name}
                                                onChange={onChange}
                                                placeholder="Nguyen Van A"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control
                                                name="phone"
                                                value={form.phone}
                                                onChange={onChange}
                                                placeholder="0901234567"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={onChange}
                                                placeholder="you@example.com"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>City / Province</Form.Label>
                                            <Form.Control
                                                name="city"
                                                value={form.city}
                                                onChange={onChange}
                                                placeholder="Ho Chi Minh City"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                name="address"
                                                value={form.address}
                                                onChange={onChange}
                                                placeholder="House no., street, ward, district"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Note (optional)</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="note"
                                                value={form.note}
                                                onChange={onChange}
                                                placeholder="Delivery instruction, invoice note…"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr className="my-4" />

                                <h5 className="mb-3">Payment method</h5>
                                <div className="d-flex flex-column gap-2">
                                    <Form.Check
                                        type="radio"
                                        name="method"
                                        id="pay-cod"
                                        label="Cash on Delivery (COD)"
                                        value="cod"
                                        checked={payment.method === "cod"}
                                        onChange={onPayChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="method"
                                        id="pay-bank"
                                        label="Bank Transfer"
                                        value="bank"
                                        checked={payment.method === "bank"}
                                        onChange={onPayChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="method"
                                        id="pay-card"
                                        label="Credit/Debit Card"
                                        value="card"
                                        checked={payment.method === "card"}
                                        onChange={onPayChange}
                                    />
                                </div>

                                {payment.method === "card" && (
                                    <Row className="g-3 mt-2">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Name on card</Form.Label>
                                                <Form.Control
                                                    name="cardName"
                                                    value={payment.cardName}
                                                    onChange={onPayChange}
                                                    placeholder="NGUYEN VAN A"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Card number</Form.Label>
                                                <Form.Control
                                                    name="cardNumber"
                                                    value={payment.cardNumber}
                                                    onChange={onPayChange}
                                                    placeholder="4000 1234 5678 9010"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Expiry (MM/YY)</Form.Label>
                                                <Form.Control
                                                    name="exp"
                                                    value={payment.exp}
                                                    onChange={onPayChange}
                                                    placeholder="08/27"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>CVV</Form.Label>
                                                <Form.Control
                                                    name="cvv"
                                                    value={payment.cvv}
                                                    onChange={onPayChange}
                                                    placeholder="3–4 digits"
                                                    type="password"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )}
                            </Form>
                        </Card>
                    </Col>

                    {/* Order summary */}
                    <Col lg={5}>
                        <Card className="p-3 rounded-4 shadow-sm">
                            <h5 className="mb-3">Order summary</h5>
                            <ListGroup variant="flush" className="mb-3">
                                {cart.map((it) => (
                                    <ListGroup.Item
                                        key={it.id}
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div>
                                            <div className="fw-semibold">{it.title}</div>
                                            <small className="text-muted">
                                                {vnd(it.price)} × {it.qty}
                                            </small>
                                        </div>
                                        <div className="fw-bold">{vnd(it.price * it.qty)}</div>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="fw-semibold">Total</span>
                                    <span className="fw-bold text-success">{vnd(total)}</span>
                                </ListGroup.Item>
                            </ListGroup>

                            <Button
                                variant="success"
                                className="w-100"
                                onClick={placeOrder}
                                disabled={isPlacing}
                            >
                                {isPlacing ? "Processing..." : "Place order"}
                            </Button>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
}
