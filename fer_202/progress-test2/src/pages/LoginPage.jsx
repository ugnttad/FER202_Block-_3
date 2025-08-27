import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";


export default function LoginPage() {
    const { login } = useAuth();
    const { showToast } = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();


    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await login(username.trim(), password);
            if (res.ok) {
                showToast('Đăng nhập thành công', 'success');
                navigate(state?.from || '/products', { replace: true });
            } else {
                setError(res.error || 'Đăng nhập thất bại');
            }
        } catch {
            setError('Không kết nối được server');
        } finally {
            setLoading(false);
        }
    }


    return (
        <Container className="py-5 d-flex justify-content-center">
            <Card style={{ maxWidth: 420 }} className="w-100 shadow-sm">
                <Card.Body>
                    <h3 className="mb-3">Đăng nhập</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tài khoản</Form.Label>
                            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        {error && <div className="text-danger small mb-3">{error}</div>}
                        <div className="d-grid">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" animation="border" /> : 'Đăng nhập'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}