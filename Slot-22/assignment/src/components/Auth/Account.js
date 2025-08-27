import React, { useContext, useEffect, useMemo, useState } from "react";
import { Container, Card, ListGroup, Badge } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { imgSrc } from "../../utils/format";
import { Link } from "react-router-dom";

export default function Account() {
    const { user } = useContext(AuthContext);
    const [acc, setAcc] = useState(null);
    const [error, setError] = useState("");

    // Tải đầy đủ hồ sơ từ json-server (để lấy avatar, secret question, answer...)
    useEffect(() => {
        let cancelled = false;
        if (!user?.id) return;
        (async () => {
            try {
                const res = await fetch(`http://localhost:3001/accounts/${user.id}`);
                if (!res.ok) throw new Error("notfound");
                const data = await res.json();
                if (!cancelled) setAcc(data);
            } catch {
                setAcc(null);
                if (!cancelled) setError("Không tải được thông tin tài khoản.");
            }
        })();
        return () => { cancelled = true; };
    }, [user?.id]);

    // Thông tin để hiển thị (ưu tiên bản đầy đủ từ DB)
    const profile = acc || user || {};
    const initials = useMemo(() => {
        const base = profile.name || profile.username || profile.email || "U";
        return base.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase();
    }, [profile.name, profile.username, profile.email]);

    const masked = (s) => (s ? s.replace(/.(?=.{2}$)/g, "•") : "");

    return (
        <Container className="py-4" style={{ maxWidth: 760 }}>
            <Card className="p-4 shadow rounded-4">
                <div className="d-flex gap-4 align-items-center flex-wrap">
                    {/* Avatar */}
                    {profile.avatar ? (
                        <img
                            src={imgSrc(profile.avatar)}
                            alt="avatar"
                            style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", boxShadow: "0 8px 24px #0001" }}
                        />
                    ) : (
                        <div
                            style={{
                                width: 120, height: 120, borderRadius: "50%",
                                display: "grid", placeItems: "center",
                                background: "#e5f6ec", color: "#16a34a", fontWeight: 800, fontSize: 36
                            }}
                            aria-label="placeholder avatar"
                        >
                            {initials}
                        </div>
                    )}

                    {/* Header info */}
                    <div className="flex-grow-1">
                        <h3 className="mb-1">
                            {profile.name || profile.username || "User"}
                            {profile.role && (
                                <Badge bg={profile.role === "admin" ? "danger" : "secondary"} className="ms-2">
                                    {profile.role}
                                </Badge>
                            )}
                        </h3>
                        <div className="text-muted">{profile.email}</div>
                    </div>

                    <div className="ms-auto d-flex gap-2">
                        <Link to="/wishlist" className="btn btn-outline-primary">
                            <i className="bi bi-heart me-2"></i>Wishlist
                        </Link>
                        <Link to="/cart" className="btn btn-success">
                            <i className="bi bi-cart me-2"></i>Giỏ hàng
                        </Link>
                    </div>
                </div>

                <hr className="my-4" />

                {/* Details */}
                {error && <div className="alert alert-warning">{error}</div>}

                <ListGroup variant="flush" className="rounded-4">
                    <ListGroup.Item><b>Full name:</b> {profile.name || "—"}</ListGroup.Item>
                    <ListGroup.Item><b>Username:</b> {profile.username || "—"}</ListGroup.Item>
                    <ListGroup.Item><b>Email:</b> {profile.email || "—"}</ListGroup.Item>
                    <ListGroup.Item><b>Secret question:</b> {profile.secretQuestion || "—"}</ListGroup.Item>
                    <ListGroup.Item><b>Answer:</b> {masked(profile.answer) || "—"}</ListGroup.Item>
                </ListGroup>

                <div className="mt-4 text-muted" style={{ fontSize: 13 }}>
                    * Mật khẩu không được hiển thị vì lý do bảo mật.
                </div>
            </Card>
        </Container>
    );
}
