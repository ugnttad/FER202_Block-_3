import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Card, Button, Container, Alert } from "react-bootstrap";
import { imgSrc } from "../../utils/format";

export default function ProductDetail() {
    const { id } = useParams();
    const pid = Number(id);
    const [p, setP] = useState(null);
    const [err, setErr] = useState("");
    const { addToCart } = useContext(CartContext);
    const { has, toggle } = useContext(WishlistContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const loc = useLocation();

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await fetch(`http://localhost:3001/products?id=${encodeURIComponent(pid)}`);
                const arr = await res.json();
                if (!cancelled) {
                    if (Array.isArray(arr) && arr.length) setP(arr[0]);
                    else setErr("Không tìm thấy sản phẩm!");
                }
            } catch {
                if (!cancelled) setErr("Không tìm thấy sản phẩm!");
            }
        }
        load();
        return () => { cancelled = true; };
    }, [pid]);

    if (err) return <Container className="text-center mt-5"><Alert variant="danger">{err}</Alert></Container>;
    if (!p) return <Container className="text-center mt-5">Đang tải...</Container>;

    const handleWishlist = () => {
        if (!user) {
            const redirect = `/login?redirect_uri=${encodeURIComponent(loc.pathname + loc.search)}`;
            return navigate(redirect);
        }
        const was = has(p.id);
        toggle(p.id);
        if (was) navigate("/wishlist");
    };

    return (
        <Container style={{ maxWidth: 560 }}>
            <Card className="shadow-lg mt-5 p-3 rounded-4">
                <div className="detail-thumb"><img src={imgSrc(p.image)} alt={p.title} /></div>
                <Card.Body className="text-center">
                    <h3 className="text-success">{p.title}</h3>
                    <div className="mb-2">
                        {p.tags?.includes("sale") ? (
                            <>
                                <span className="text-decoration-line-through me-2">{p.price.toLocaleString("vi-VN")}đ</span>
                                <span className="fw-bold text-success">{(p.salePrice || 0).toLocaleString("vi-VN")}đ</span>
                            </>
                        ) : (
                            <span className="fw-bold text-success">{p.price.toLocaleString("vi-VN")}đ</span>
                        )}
                    </div>
                    <Card.Text className="mb-3">{p.description}</Card.Text>
                    <Button variant="success" size="lg" className="me-2" onClick={() => addToCart(p)}>
                        <i className="bi bi-cart-plus me-2"></i>Add to Cart
                    </Button>
                    <Button variant={has(p.id) ? "outline-primary" : "outline-secondary"} size="lg" className="me-2" onClick={handleWishlist}>
                        {has(p.id) ? "View Wishlist" : "Add to Wishlist"}
                    </Button>
                    <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left me-2"></i>Back
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
