import React, { useState, useEffect } from "react";
import FoodForm from "./FoodForm";
import { Card, Button, Row, Col, Container, Alert } from "react-bootstrap";

function FoodManager() {
    const [foods, setFoods] = useState([]);
    const [editing, setEditing] = useState(null);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const reloadFoods = () => {
        fetch("http://localhost:3001/foods")
            .then(res => res.json())
            .then(setFoods);
    };
    useEffect(() => {
        reloadFoods();
    }, []);

    const handleAdd = (newFood) => {
        setLoading(true);
        fetch("http://localhost:3001/foods", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFood)
        })
            .then(res => res.json())
            .then(food => {
                setAdding(false);
                setLoading(false);
                reloadFoods();
                setAlert({ type: "success", msg: "Thêm món thành công!" });
            });
    };

    const handleEdit = (food) => setEditing(food);

    const handleUpdate = (updatedFood) => {
        setLoading(true);
        fetch(`http://localhost:3001/foods/${updatedFood.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFood)
        })
            .then(res => res.json())
            .then(food => {
                setEditing(null);
                setLoading(false);
                reloadFoods();
                setAlert({ type: "success", msg: "Cập nhật món thành công!" });
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa món này?")) {
            fetch(`http://localhost:3001/foods/${id}`, { method: "DELETE" })
                .then(() => reloadFoods());
        }
    };

    return (
        <Container className="my-4">
            <h2 className="text-center mb-4 text-success">Quản lý món ăn</h2>
            {alert && (
                <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible
                    className="position-fixed top-0 end-0 m-4"
                    style={{ zIndex: 9999, minWidth: 240 }}
                >{alert.msg}</Alert>
            )}
            {adding ? (
                <FoodForm onSave={handleAdd} onCancel={() => setAdding(false)} />
            ) : (
                <div className="mb-3 text-center">
                    <Button variant="success" onClick={() => setAdding(true)}>Thêm món mới</Button>
                </div>
            )}
            <Row>
                {foods.map(food => (
                    <Col xs={12} md={6} lg={4} key={food.id}>
                        <Card className="mb-4 shadow-sm rounded-4">
                            <Card.Img variant="top" src={`/assets/${food.image}`} alt={food.name} style={{ height: 110, objectFit: "cover" }} />
                            <Card.Body className="text-center">
                                {editing && editing.id === food.id ? (
                                    <FoodForm
                                        food={editing}
                                        onSave={handleUpdate}
                                        onCancel={() => setEditing(null)}
                                    />
                                ) : (
                                    <>
                                        <b className="card-title text-success">{food.name}</b>
                                        <Button variant="outline-primary" className="me-2" onClick={() => handleEdit(food)}>Sửa</Button>
                                        <Button variant="outline-danger" onClick={() => handleDelete(food.id)}>Xóa</Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {loading && <p className="text-center mt-3 text-primary">Đang xử lý...</p>}
        </Container>
    );
}
export default FoodManager;
