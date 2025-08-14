import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Form, Button, Alert } from "react-bootstrap";

const nameInRange = (s) => typeof s === "string" && s.trim().length >= 3 && s.trim().length <= 50;
const isValidAge = (v) => {
    const n = parseInt(v, 10);
    return !isNaN(n) && n >= 18 && n <= 100;
};
const isValidEmail = (s) => {
    // Regex cơ bản cho email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(s).toLowerCase());
};
const isValidPhone = (s) => /^\d{10,15}$/.test(String(s || "").trim());

const ValidatedForm = ({ initial, onSubmit }) => {
    const [form, setForm] = useState({
        name: initial?.name || "",
        age: initial?.age || "",
        email: initial?.email || "",
        phone: initial?.phone || "",
        terms: initial?.terms || false,
    });
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const setField = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const validate = () => {
        const e = {};
        if (!nameInRange(form.name)) e.name = "Tên phải có 3–50 ký tự.";
        if (!isValidAge(form.age)) e.age = "Tuổi phải là số hợp lệ từ 18 đến 100.";
        if (!isValidEmail(form.email)) e.email = "Email không đúng định dạng.";
        if (!isValidPhone(form.phone)) e.phone = "Số điện thoại phải gồm 10–15 chữ số.";
        if (!form.terms) e.terms = "Bạn phải đồng ý với điều khoản.";

        setErrors(e);
        setShowAlert(Object.keys(e).length > 0);
        return Object.keys(e).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({
                name: form.name.trim(),
                age: parseInt(form.age, 10),
                email: form.email.trim(),
                phone: form.phone.trim(),
                terms: form.terms,
            });
        }
    };

    return (
        <Container style={{ paddingLeft: 0 }}>
            {showAlert && (
                <Alert variant="danger">
                    <strong>Có lỗi!</strong> Vui lòng kiểm tra lại các trường bên dưới.
                </Alert>
            )}

            <Form onSubmit={submit} noValidate>
                <Form.Group controlId="validated-name" className="mb-3">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={setField}
                        isInvalid={!!errors.name}
                        placeholder="Ví dụ: Nguyễn Văn A"
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validated-age" className="mb-3">
                    <Form.Label>Tuổi</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={setField}
                        isInvalid={!!errors.age}
                        placeholder="18–100"
                    />
                    <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validated-email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={setField}
                        isInvalid={!!errors.email}
                        placeholder="ban@example.com"
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validated-phone" className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={setField}
                        isInvalid={!!errors.phone}
                        placeholder="Chỉ gồm chữ số (10–15)"
                    />
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validated-terms" className="mb-3">
                    <Form.Check
                        type="checkbox"
                        name="terms"
                        checked={form.terms}
                        onChange={setField}
                        isInvalid={!!errors.terms}
                        label="Tôi đồng ý với điều khoản"
                        feedback={errors.terms}
                        feedbackType="invalid"
                    />
                </Form.Group>

                <Button type="submit" variant="primary">Gửi</Button>
            </Form>
        </Container>
    );
};

ValidatedForm.propTypes = {
    initial: PropTypes.shape({
        name: PropTypes.string,
        age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        email: PropTypes.string,
        phone: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        terms: PropTypes.bool,
    }),
    onSubmit: PropTypes.func.isRequired,
};

export default ValidatedForm;
