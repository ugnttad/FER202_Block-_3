import React, { useState } from "react";
import PropTypes, { checkPropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Alert, Card } from "react-bootstrap";

// Custom validator đảm bảo chuỗi không rỗng
function nonEmptyString(props, propName, componentName) {
    const v = props[propName];
    if (typeof v !== "string" || v.trim().length === 0) {
        return new Error(
            `Invalid prop '${propName}' supplied to '${componentName}': required non-empty string.`
        );
    }
    return null;
}

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [values, setValues] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState("");
    const [variant, setVariant] = useState("danger");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate bằng PropTypes ở runtime (yêu cầu của đề bài)
        const creds = { ...values };
        const schema = { username: nonEmptyString, password: nonEmptyString };
        const err = checkPropTypes(schema, creds, "prop", "LoginCredentials");
        // checkPropTypes không trả về string error; nó log warning. Ta vẫn làm thêm check thủ công:
        if (!values.username.trim() || !values.password.trim()) {
            setVariant("danger");
            setMsg("Username và Password không được để trống.");
            return;
        }

        try {
            setSubmitting(true);
            const u = await login(values.username.trim(), values.password.trim());
            setVariant("success");
            setMsg(`Login successfully with username: ${u.username}`);
            // điều hướng sang PostList
            navigate("/posts", { replace: true });
        } catch (error) {
            setVariant("danger");
            setMsg("Sai username/password hoặc không tồn tại user.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="mx-auto" style={{ maxWidth: 420 }}>
            <Card.Body>
                <Card.Title className="mb-3">Login</Card.Title>
                {msg && <Alert variant={variant}>{msg}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={values.username}
                            onChange={(e) => setValues({ ...values, username: e.target.value })}
                            placeholder="admin"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            placeholder="123456"
                        />
                    </Form.Group>
                    <Button type="submit" disabled={submitting}>
                        {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

// (Ví dụ) nếu tách thành <LoginForm onSubmit/initialValues />, ta sẽ dùng PropTypes ở đây.
// Ở file này, ta đã dùng PropTypes.checkPropTypes để thỏa yêu cầu validate bằng PropTypes cho form Login.
Login.propTypes = {
    // Không nhận props, phần này minh họa cách dùng PropTypes cho form nếu cần
    initialValues: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string
    })
};
