import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { imgSrc } from "../../utils/format";

export default function Wishlist() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let ids = [];
        try {
            const raw = localStorage.getItem("wishlist_ids") || "[]";
            const parsed = JSON.parse(raw);
            ids = Array.isArray(parsed) ? parsed.map(Number).filter(Number.isFinite) : [];
        } catch { }
        fetch("http://localhost:3001/products")
            .then((r) => r.json())
            .then((all) => setItems(all.filter((p) => ids.includes(Number(p.id)))))
            .catch(() => setItems([]));
    }, []);

    return (
        <div className="container py-4">
            <h3 className="mb-3">Wishlist</h3>
            {!items.length ? (
                <div className="alert alert-info">Chưa có sản phẩm yêu thích.</div>
            ) : (
                <div className="row g-3">
                    {items.map((p) => (
                        <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                            <div className="card h-100">
                                <div className="thumb-wrap"><img src={imgSrc(p.image)} alt={p.title} className="thumb-img" /></div>
                                <div className="card-body">
                                    <h6 className="card-title">{p.title}</h6>
                                    <p className="mb-2 text-success fw-bold">{(p.salePrice ?? p.price).toLocaleString("vi-VN")}đ</p>
                                    <Link to={`/product/${p.id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
