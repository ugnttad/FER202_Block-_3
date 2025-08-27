import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export default function LoginModal({ show, onHide }) {
    const { login } = useAuth();
    const { showToast } = useToast();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await login(username.trim(), password);
            if (res.ok) {
                showToast("Đăng nhập thành công", "success");
                onHide?.();
            } else {
                setError(res.error || "Đăng nhập thất bại");
            }
        } catch {
            setError("Không kết nối được server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Đăng nhập</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tài khoản</Form.Label>
                        <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    {error && <div className="text-danger small">{error}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Hủy</Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? <Spinner size="sm" animation="border" /> : "Đăng nhập"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
