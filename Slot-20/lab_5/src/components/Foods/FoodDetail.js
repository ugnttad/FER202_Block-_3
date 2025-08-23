import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { Card, Button, Container, Alert } from "react-bootstrap";

function FoodDetail() {
    const { id } = useParams();
    const [food, setFood] = useState(undefined);
    const [notfound, setNotfound] = useState(false);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/foods/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then(data => {
                if (data && data.id) setFood(data);
                else setNotfound(true);
            })
            .catch(() => setNotfound(true));
    }, [id]);

    if (notfound) return <Container className="text-center mt-5"><Alert variant="danger">Không tìm thấy món ăn!</Alert></Container>;
    if (!food) return <Container className="text-center mt-5">Đang tải...</Container>;

    return (
        <Container style={{ maxWidth: 560 }}>
            <Card className="shadow-lg mt-5 p-3 rounded-4">
                <Card.Img
                    variant="top"
                    src={`/assets/${food.image}`}
                    alt={food.name}
                    style={{ borderRadius: 20, height: 260, objectFit: "cover" }}
                />
                <Card.Body className="text-center">
                    <h3 className="text-success">{food.name}</h3>
                    <div className="mb-2">
                        <span className="price-old">{food.price}đ</span>
                        <span className="price-new">{food.currentPrice}đ</span>
                    </div>
                    <Card.Text className="mb-3">{food.description}</Card.Text>
                    <Button variant="success" size="lg" className="me-2" onClick={() => addToCart(food)}>
                        <i className="bi bi-cart-plus me-2"></i>Đặt món ngay
                    </Button>
                    <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left me-2"></i>Quay lại
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default FoodDetail;
