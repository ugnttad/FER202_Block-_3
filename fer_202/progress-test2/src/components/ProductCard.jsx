import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa';

import { formatPrice } from '../utils/format';
import { useCart } from '../contexts/CartContext';
import { useFavourites } from '../contexts/FavouritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isFav, toggleFav } = useFavourites();
    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();

    // Chuẩn hóa dữ liệu hiển thị
    const name = product.name || product.title || 'Sản phẩm';
    const price = Number(product.price) || 0;
    const image = product.image || `https://picsum.photos/seed/${product.id}/600/400`;

    const handleView = () => navigate(`/products/${product.id}`);

    const handleAddCart = () => {
        addToCart({ id: product.id, name, price, image }, 1);
        showToast(`Đã thêm “${name}” vào giỏ`, 'success');
    };

    const handleToggleFav = () => {
        if (!isAuthenticated) {
            showToast('Vui lòng đăng nhập để sử dụng Yêu thích', 'warning');
            return;
        }
        const wasFav = isFav(product.id);
        toggleFav(product.id);
        showToast(wasFav ? 'Đã bỏ khỏi Yêu thích' : 'Đã thêm vào Yêu thích', 'primary');
    };

    const favActive = isFav(product.id);

    return (
        <Card className="h-100 shadow-sm product-card">
            <Card.Img
                variant="top"
                src={image}
                alt={name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="h6 mb-2">{name}</Card.Title>
                <Card.Text className="flex-grow-1 small text-muted mb-2">
                    {product.description || ' '}
                </Card.Text>

                <div className="mb-3">
                    <Badge bg="primary" className="fs-6">
                        {formatPrice(price)}
                    </Badge>
                </div>

                <ButtonGroup className="w-100">
                    <Button variant="outline-primary" size="sm" className="flex-fill" onClick={handleView}>
                        <FaEye className="me-1" />
                        View Details
                    </Button>

                    <Button variant="success" size="sm" className="flex-fill" onClick={handleAddCart}>
                        <FaCartPlus className="me-1" />
                        Add to Cart
                    </Button>

                    <Button
                        variant={favActive ? 'danger' : 'outline-danger'}
                        size="sm"
                        className="flex-fill"
                        onClick={handleToggleFav}
                    >
                        <FaHeart className="me-1" />
                        {favActive ? 'Favourited' : 'Favourite'}
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
