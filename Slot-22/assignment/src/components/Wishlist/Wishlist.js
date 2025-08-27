import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../contexts/WishlistContext";
import { Alert, Button } from "react-bootstrap";
import { imgSrc } from "../../utils/format";

export default function Wishlist() {
    const { ids, toggle } = useContext(WishlistContext); // ids là Set
    const [all, setAll] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((r) => r.json())
            .then((data) => Array.isArray(data) ? setAll(data) : setAll([]))
            .catch(() => setAll([]));
    }, []);

    // auto-hide toast
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2200);
        return () => clearTimeout(t);
    }, [toast]);

    // lọc theo ids hiện có
    const items = useMemo(() => {
        const setIds = new Set(Array.from(ids).map(Number));
        return all.filter((p) => setIds.has(Number(p.id)));
    }, [all, ids]);

    const remove = (id) => {
        toggle(id); // toggle sẽ xoá nếu đã có
        setToast({ type: "success", msg: "Removed from wishlist" });
    };

    return (
        <div className="container py-4">
            {toast && (
                <Alert
                    variant={toast.type}
                    className="position-fixed top-0 end-0 m-4"
                    style={{ zIndex: 9999, minWidth: 240 }}
                    onClose={() => setToast(null)}
                    dismissible
                >
                    {toast.msg}
                </Alert>
            )}

            <h3 className="mb-3">Wishlist</h3>

            {!items.length ? (
                <div className="alert alert-info">Chưa có sản phẩm yêu thích.</div>
            ) : (
                <div className="row g-3">
                    {items.map((p) => (
                        <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                            <div className="card h-100">
                                <div className="thumb-wrap">
                                    <img src={imgSrc(p.image)} alt={p.title} className="thumb-img" />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h6 className="card-title">{p.title}</h6>
                                    <p className="mb-2">
                                        {p.tags?.includes("sale") ? (
                                            <>
                                                <span className="text-decoration-line-through me-2">
                                                    {p.price.toLocaleString("vi-VN")}đ
                                                </span>
                                                <span className="fw-bold text-success">
                                                    {(p.salePrice || 0).toLocaleString("vi-VN")}đ
                                                </span>
                                            </>
                                        ) : (
                                            <span className="fw-bold text-success">
                                                {p.price.toLocaleString("vi-VN")}đ
                                            </span>
                                        )}
                                    </p>

                                    <div className="mt-auto d-flex justify-content-between">
                                        <Link to={`/product/${p.id}`} className="btn btn-outline-primary btn-sm">
                                            View Details
                                        </Link>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => remove(p.id)}
                                            title="Xoá khỏi wishlist"
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
