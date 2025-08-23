import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";

export default function Login() {
  const { user, login, setRedirectAfterLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const redirect = sp.get("redirect_uri") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }
    setError("");
    setRedirectAfterLogin(redirect);
    const ok = await login(form.email.trim(), form.password);
    if (ok) {
      setToast({ type: "success", msg: "Đăng nhập thành công!" });
      setTimeout(() => navigate(redirect, { replace: true }), 900);
    } else {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  if (user)
    return (
      <Container className="text-center mt-5" style={{ maxWidth: 420 }}>
        <Alert variant="success">
          <i className="bi bi-person-circle me-2"></i>
          Đã đăng nhập với tên <b>{user.name || user.username || user.email}</b>
        </Alert>
      </Container>
    );

  return (
    <Form className="container card p-5 shadow mt-4 bg-light" style={{ maxWidth: 460 }} onSubmit={handleSubmit}>
      <h3 className="mb-3 text-success text-center"><i className="bi bi-person-circle me-2"></i>Đăng nhập</h3>

      {toast && <Alert variant={toast.type} onClose={() => setToast(null)} dismissible>{toast.msg}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••" />
      </Form.Group>

      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      <Button type="submit" variant="success" className="w-100 mb-3">
        <i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
      </Button>

      <div className="text-center">
        <span className="text-muted me-2">New Customer?</span>
        <Link to="/register">Create an account</Link>
      </div>
    </Form>
  );
}
