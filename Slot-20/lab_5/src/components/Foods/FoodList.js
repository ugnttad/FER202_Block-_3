import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { Carousel, Row, Col, Card, Button, Container } from "react-bootstrap";

function FoodList() {
    const [foods, setFoods] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch("http://localhost:3001/foods")
            .then(res => res.json())
            .then(data => Array.isArray(data) ? setFoods(data) : setFoods([]))
            .catch(() => setFoods([]));
    }, []);


    const banners = [
        "/assets/banner1.jpg",
        "/assets/banner2.jpg",
        "/assets/banner3.jpg"
    ];

    return (
        <Container className="my-4">

            {/* Banner bo góc ngoài, ảnh fit chuẩn, không bị viền méo khi chuyển slider */}
            <div style={{
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 8px 30px #0001",
                maxWidth: 1200,
                margin: "0 auto",
                marginBottom: 40
            }}>
                <Carousel>
                    {banners.map((src, idx) => (
                        <Carousel.Item key={idx} style={{ height: 370, background: "#f8f8f5" }}>
                            <img
                                src={src}
                                alt={`Banner ${idx + 1}`}
                                className="d-block w-100 h-100"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <style>
                {`
    @media (max-width: 1000px) {
      .carousel .carousel-item { height: 220px !important; }
    }
    @media (max-width: 600px) {
      .carousel .carousel-item { height: 120px !important; }
    }
    `}
            </style>
            <h2 className="text-center mb-2 text-success">Ẩm thực nhà hàng Richie</h2>
            <p className="text-center mb-5" style={{ fontStyle: 'italic', color: '#a28055', fontSize: "1.11rem" }}>
                “Ẩm thực – Nghệ thuật của sự sẻ chia và tận hưởng”
            </p>
            <Row xs={1} md={2} lg={3} className="g-4">
                {foods.length > 0 ? foods.map(food => (
                    <Col key={food.id}>
                        <Card className="food-card shadow h-100 rounded-4">
                            <Card.Img
                                variant="top"
                                src={`/assets/${food.image}`}
                                alt={food.name}
                                style={{ height: 180, objectFit: "cover", borderRadius: "16px 16px 8px 8px" }}
                            />
                            <Card.Body className="d-flex flex-column text-center">
                                <Card.Title>{food.name}</Card.Title>
                                <Card.Text>{food.description}</Card.Text>
                                <div className="mb-2">
                                    <span className="price-old">{food.price}đ</span>
                                </div>
                                <div className="mt-auto">
                                    <Button variant="success" className="me-2" onClick={() => addToCart(food)}>
                                        <i className="bi bi-cart-plus me-1"></i>Đặt ngay
                                    </Button>
                                    <Link to={`/food/${food.id}`}>
                                        <Button variant="outline-primary">Xem chi tiết</Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                )) : (
                    <Col className="text-center text-muted">Không có dữ liệu món ăn!</Col>
                )}
            </Row>
        </Container>
    );
}
export default FoodList;
