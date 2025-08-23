import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { ToastContext } from "../contexts/ToastContext";

// helpers: định dạng & đọc giá từ number/string
const toNumber = (v) => {
    if (v == null) return 0;
    if (typeof v === "number") return v;
    return Number(String(v).replace(/[^\d]/g, "")) || 0;
};
const formatVND = (v) => toNumber(v).toLocaleString("vi-VN") + "đ";

export default function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);
    const { toggleFav, isFav } = useContext(FavouritesContext);
    const { show } = useContext(ToastContext);

    const fav = isFav(product.id);
    const oldPrice = product.price ?? product.oldPrice ?? product.originalPrice ?? null;
    const newPrice = product.currentPrice ?? product.salePrice ?? product.newPrice ?? oldPrice;

    const onAddCart = () => { addToCart(product, 1); show("Added to cart"); };
    const onFav = () => { toggleFav(product); show(fav ? "Removed from favourites" : "Added to favourites"); };

    return (
        <Card className="food-card shadow h-100 rounded-4">
            <Card.Img
                variant="top"
                src={`/images/${product.image}`}
                alt={product.name}
                style={{ height: 180, objectFit: "cover", borderRadius: "16px 16px 8px 8px" }}
            />
            <Card.Body className="d-flex flex-column text-center">
                <Card.Title>{product.name}</Card.Title>
                {product.description && <Card.Text>{product.description}</Card.Text>}

                {/* Hiển thị giá (fall back linh hoạt) */}
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

                <div className="mt-auto d-flex justify-content-center gap-2 flex-wrap">
                    <Link to={`/products/${product.id}`} className="btn btn-outline-primary">View Details</Link>
                    <Button variant="success" onClick={onAddCart}>
                        <i className="bi bi-cart-plus me-1" />Add to Cart
                    </Button>

                    {!fav ? (
                        <Button variant="outline-danger" onClick={onFav}>
                            <i className="bi bi-heart me-1" />Add to Favourite
                        </Button>
                    ) : (
                        <>
                            <Link to="/favourites" className="btn btn-danger">
                                <i className="bi bi-heart-fill me-1" />Browse to My favourites
                            </Link>
                            <Button variant="outline-secondary" onClick={onFav} title="Remove from favourites">
                                <i className="bi bi-x-circle me-1" />Remove
                            </Button>
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
