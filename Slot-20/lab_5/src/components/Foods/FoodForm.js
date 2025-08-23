import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function FoodForm({ onSave, food, onCancel }) {
  const [form, setForm] = useState(
    food || { name: "", description: "", price: "", currentPrice: "", image: "" }
  );

  useEffect(() => { if (food) setForm(food); }, [food]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price || !form.currentPrice || !form.image) {
      alert("Điền đầy đủ thông tin!");
      return;
    }
    onSave(form);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 rounded bg-light shadow" style={{maxWidth: 350, margin: "auto"}}>
      <Form.Group className="mb-3">
        <Form.Control name="name" value={form.name} onChange={handleChange} placeholder="Tên món ăn" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control name="price" value={form.price} onChange={handleChange} placeholder="Giá gốc" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control name="currentPrice" value={form.currentPrice} onChange={handleChange} placeholder="Giá khuyến mãi" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control name="image" value={form.image} onChange={handleChange} placeholder="Tên file ảnh" required />
      </Form.Group>
      <div className="d-flex gap-2">
        <Button type="submit" variant="success">{food ? "Cập nhật" : "Thêm mới"}</Button>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Hủy</Button>}
      </div>
    </Form>
  );
}
export default FoodForm;
