import React, { useState, useReducer } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

// Reducer để quản lý trạng thái form
const initialState = {
    name: "",
    email: "",
    password: "",
    isSubmitted: false,
};

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SUBMIT":
            return { ...state, isSubmitted: true };
        default:
            return state;
    }
};

const MyForm = ({ title, onSubmit }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    };

    const handleValidation = () => {
        const newErrors = {};
        if (!state.name) newErrors.name = "Tên không được để trống!";
        if (!state.email) newErrors.email = "Email không được để trống!";
        if (!state.password) newErrors.password = "Mật khẩu không được để trống!";

        setShowAlert(Object.keys(newErrors).length > 0);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            dispatch({ type: "SUBMIT" });
            onSubmit(state);
        }
    };

    return (
        <Container style={{ paddingLeft: 0 }}>
            <h3>{title}</h3>

            {showAlert && (
                <Alert variant="danger">
                    <strong>Lỗi:</strong> Vui lòng điền đầy đủ thông tin.
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="myform-name" className="mb-3">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="myform-email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="myform-password" className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

MyForm.propTypes = {
    title: PropTypes.string.isRequired,  // Tiêu đề phải là một chuỗi
    onSubmit: PropTypes.func.isRequired, // Hàm onSubmit phải là một function
};

export default MyForm;
