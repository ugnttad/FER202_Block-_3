import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';

import { useCart } from '../contexts/CartContext';
import { useFavourites } from '../contexts/FavouritesContext';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';

import { formatPrice } from '../utils/format';
import api from '../services/api';

export default function ProductDetails() {
    const { id } = useParams();
    const [p, setP] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { addToCart } = useCart();
    const { isFav, toggleFav } = useFavourites();
    const { showToast } = useToast();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError('');
            try {
                // Thử /phones/:id trước; nếu fail/404 thì fallback sang /products/:id
                let data = null;
                try {
                    const r1 = await api.get(`/phones/${id}`);
                    data = r1.data;
                } catch {
                    // bỏ qua, sẽ thử /products/:id
                }
                if (!data || !data.id) {
                    const r2 = await api.get(`/products/${id}`);
                    data = r2.data;
                }

                const prod = {
                    id: data.id,
                    name: data.title || data.name || 'Sản phẩm',
                    image: data.image || `https://picsum.photos/seed/${data.id}/800/600`,
                    price: Number(data.price) || 0,
                    description: data.description || 'No description',
                    category: data.category || 'other',
                };
                setP(prod);
            } catch (e) {
                setError('Không tìm thấy sản phẩm');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }
    if (error) {
        return (
            <Container className="py-4">
                <Card className="text-center">
                    <Card.Body className="text-danger">{error}</Card.Body>
                </Card>
            </Container>
        );
    }
    if (!p) return null;

    const fav = isFav(p.id);

    const handleAddCart = () => {
        addToCart(
            {
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.image,
            },
            1
        );
        showToast(`Đã thêm “${p.name}” vào giỏ`, 'success');
    };

    const handleToggleFav = () => {
        if (!isAuthenticated) {
            showToast('Vui lòng đăng nhập để sử dụng Yêu thích', 'warning');
            return;
        }
        const before = isFav(p.id);
        toggleFav(p.id);
        showToast(before ? 'Đã bỏ khỏi Yêu thích' : 'Đã thêm vào Yêu thích', before ? 'secondary' : 'danger');
    };

    return (
        <Container className="py-4">
            <Row className="g-4">
                <Col md={6}>
                    <Card>
                        <Card.Img src={p.image} alt={p.name} />
                    </Card>
                </Col>
                <Col md={6}>
                    <h2 className="mb-2">{p.name}</h2>
                    <div className="mb-3">
                        <Badge bg="primary" className="fs-5">
                            {formatPrice(p.price)}
                        </Badge>
                    </div>
                    <p className="text-muted">{p.description}</p>

                    <div className="d-flex gap-2 mt-3">
                        <Button variant="success" onClick={handleAddCart}>
                            Thêm vào giỏ
                        </Button>
                        <Button variant={fav ? 'danger' : 'outline-danger'} onClick={handleToggleFav}>
                            {fav ? '♥ Bỏ yêu thích' : '♥ Yêu thích'}
                        </Button>
                    </div>

                    <div className="mt-4">
                        <Button as={Link} to="/products" variant="outline-secondary">
                            ← Quay lại danh sách
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
