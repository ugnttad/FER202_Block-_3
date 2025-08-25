import React, { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Carousel, Row, Col, Card, Button, Container, Form, Alert } from "react-bootstrap";
import { imgSrc } from "../../utils/format";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [q, setQ] = useState("");
    const [sort, setSort] = useState("name");
    const [toast, setToast] = useState(null);

    const { addToCart } = useContext(CartContext);
    const { has, toggle } = useContext(WishlistContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then(res => res.json())
            .then(data => Array.isArray(data) ? setProducts(data) : setProducts([]))
            .catch(() => setProducts([]));
    }, []);

    // debounce search ~300ms
    const [query, setQuery] = useState("");
    useEffect(() => { const t = setTimeout(() => setQuery(q), 300); return () => clearTimeout(t); }, [q]);

    const handleSearchChange = useCallback((e) => setQ(e.target.value), []);
    const handleSortChange = useCallback((e) => setSort(e.target.value), []);

    const filtered = useMemo(() => {
        const list = products.filter(p => (p.title || "").toLowerCase().includes((query || "").toLowerCase()));
        switch (sort) {
            case "price_asc": return list.slice().sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
            case "price_desc": return list.slice().sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
            default: return list.slice().sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        }
    }, [products, query, sort]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2200);
        return () => clearTimeout(t);
    }, [toast]);

    const onWishClick = (p) => {
        if (!user) {
            setToast({ type: "info", msg: "Please sign in to save wishlist" });
            const redirect = `/login?redirect_uri=${encodeURIComponent(location.pathname + location.search)}`;
            return navigate(redirect);
        }
        if (has(p.id)) return navigate("/wishlist"); // đã có → đi wishlist
        toggle(p.id);
        setToast({ type: "success", msg: "Added to wishlist!" });
    };

    const banners = ["/images/hero1.webp", "/images/hero2.jpg", "/images/hero3.jpg"];

    return (
        <Container className="my-4">
            {toast && <Alert variant={toast.type} className="position-fixed top-0 end-0 m-4" style={{ zIndex: 9999 }}>{toast.msg}</Alert>}

            {/* HeroSlider */}
            <div style={{ borderRadius: 28, overflow: "hidden", boxShadow: "0 8px 30px #0001", maxWidth: 1200, margin: "0 auto 40px" }}>
                <Carousel pause="hover">
                    {banners.map((src, idx) => (
                        <Carousel.Item key={idx} style={{ height: 360, background: "#f8f8f5" }}>
                            <img src={src} alt={`Promotional banner ${idx + 1}`} className="d-block w-100 h-100" style={{ objectFit: "cover" }} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            {/* Nav bar (search & sort) */}
            <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
                <Form.Control style={{ maxWidth: 320 }} placeholder="Search products..." value={q} onChange={handleSearchChange} />
                <Form.Select style={{ maxWidth: 220 }} value={sort} onChange={handleSortChange}>
                    <option value="name">Name A→Z</option>
                    <option value="price_asc">Price Ascending</option>
                    <option value="price_desc">Price Descending</option>
                </Form.Select>
            </div>

            {/* ProductGrid 3/2/1 */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {filtered.map(p => {
                    const isWished = user && has(p.id);
                    return (
                        <Col key={p.id}>
                            <Card className="h-100 rounded-4 shadow-sm">
                                <div className="thumb-wrap">
                                    <img src={imgSrc(p.image)} alt={p.title} className="thumb-img" />
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <Card.Title className="me-2">{p.title}</Card.Title>
                                        {p.tags?.includes("hot") && <span className="badge text-bg-danger">HOT</span>}
                                    </div>
                                    <Card.Text className="text-muted">{p.name}</Card.Text>
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
                                    <div className="mt-auto d-flex gap-2">
                                        <Button variant="success" onClick={() => { addToCart(p); setToast({ type: "success", msg: "Added to cart!" }); }}>
                                            <i className="bi bi-cart-plus me-1"></i>Add to Cart
                                        </Button>

                                        <Button
                                            variant={isWished ? "outline-primary" : "outline-secondary"}
                                            onClick={() => onWishClick(p)}
                                        >
                                            {isWished ? "View Wishlist" : "Add to Wishlist"}
                                        </Button>

                                        <Link className="btn btn-outline-dark" to={`/product/${p.id}`}>Details</Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}
