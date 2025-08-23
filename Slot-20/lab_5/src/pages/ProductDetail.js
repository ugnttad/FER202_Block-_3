import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Container, Alert } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { ToastContext } from "../contexts/ToastContext";

const toNumber = (v) => (typeof v === "number" ? v : Number(String(v || "").replace(/[^\d]/g, "")) || 0);
const formatVND = (v) => toNumber(v).toLocaleString("vi-VN") + "đ";

export default function ProductDetail() {
    const { id } = useParams();
    const [food, setFood] = useState();
    const [notfound, setNotfound] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { toggleFav, isFav } = useContext(FavouritesContext);
    const { show } = useContext(ToastContext);

    useEffect(() => {
        fetch(`http://localhost:3001/foods/${id}`)
            .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
            .then((d) => (d && d.id ? setFood(d) : setNotfound(true)))
            .catch(() => setNotfound(true));
    }, [id]);

    if (notfound) return <Container className="text-center mt-5"><Alert variant="danger">Không tìm thấy món ăn!</Alert></Container>;
    if (!food) return <Container className="text-center mt-5">Đang tải…</Container>;

    const fav = isFav(food.id);
    const oldPrice = food.price ?? food.oldPrice ?? food.originalPrice ?? null;
    const newPrice = food.currentPrice ?? food.salePrice ?? food.newPrice ?? oldPrice;

    return (
        <Container style={{ maxWidth: 560 }}>
            <Card className="shadow-lg mt-5 p-3 rounded-4">
                <Card.Img variant="top" src={`/images/${food.image}`} alt={food.name}
                    style={{ borderRadius: 20, height: 260, objectFit: "cover" }} />
                <Card.Body className="text-center">
                    <h3 className="text-success">{food.name}</h3>
                    <div className="mb-2">
                        {oldPrice && newPrice && toNumber(oldPrice) !== toNumber(newPrice) ? (
                            <>
                                <span className="price-old">{formatVND(oldPrice)}</span>
                                <span className="price-new">{formatVND(newPrice)}</span>
                            </>
                        ) : (
                            <span className="price-new">{formatVND(newPrice ?? oldPrice ?? 0)}</span>
                        )}
                    </div>
                    {food.description && <Card.Text className="mb-3">{food.description}</Card.Text>}
                    <div className="d-flex justify-content-center flex-wrap gap-2">
                        <Button variant="success" size="lg" onClick={() => { addToCart(food); show("Added to cart"); }}>
                            <i className="bi bi-cart-plus me-2" />Add to Cart
                        </Button>
                        <Link to="/products" className="btn btn-secondary btn-lg">
                            <i className="bi bi-arrow-left me-2" />Back to List
                        </Link>
                        {!fav ? (
                            <Button variant="outline-danger" size="lg" onClick={() => { toggleFav(food); show("Added to favourites"); }}>
                                <i className="bi bi-heart me-2" />Add to Favourite
                            </Button>
                        ) : (
                            <>
                                <Link to="/favourites" className="btn btn-danger btn-lg">
                                    <i className="bi bi-heart-fill me-2" />Browse to My favourites
                                </Link>
                                <Button variant="outline-secondary" size="lg" onClick={() => { toggleFav(food); show("Removed from favourites"); }}>
                                    <i className="bi bi-x-circle me-2" />Remove
                                </Button>
                            </>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
