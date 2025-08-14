import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container } from "react-bootstrap";

// Component UserProfile2
const UserProfile2 = ({ name, age, onSubmit }) => {
    const [formData, setFormData] = useState({ name: name, age: age });
    const [errors, setErrors] = useState({});

    // Hàm xử lý thay đổi giá trị input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Kiểm tra lỗi dữ liệu trước khi submit
    const validateForm = () => {
        const newErrors = {};

        const parsedAge = parseInt(formData.age, 10);
        if (!formData.name) newErrors.name = "Tên là bắt buộc";
        if (formData.age === "" || formData.age === undefined || formData.age === null) {
            newErrors.age = "Tuổi không được để trống!";
        } else if (isNaN(parsedAge)) {
            newErrors.age = "Tuổi phải là một số hợp lệ!";
        } else if (parsedAge < 18 || parsedAge > 100) {
            newErrors.age = "Tuổi phải nằm trong khoảng từ 18 đến 100!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ ...formData });
        }
    };

    return (
        <Container style={{ paddingLeft: 0 }}>
            <h3>Thông Tin Người Dùng</h3>
            <Form onSubmit={handleSubmit}>
                {/* Tên */}
                <Form.Group controlId="userprofile2-name" className="mb-3">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name ?? ""}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                {/* Tuổi */}
                <Form.Group controlId="userprofile2-age" className="mb-3">
                    <Form.Label>Tuổi</Form.Label>
                    <Form.Control
                        type="text"
                        name="age"
                        value={formData.age ?? ""}
                        onChange={handleChange}
                        isInvalid={!!errors.age}
                    />
                    <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">Gửi</Button>
            </Form>
        </Container>
    );
};

// PropTypes
UserProfile2.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSubmit: PropTypes.func.isRequired,
};

export default UserProfile2;
