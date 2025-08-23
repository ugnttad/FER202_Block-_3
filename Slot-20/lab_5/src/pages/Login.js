import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const ok = await login(form.username.trim(), form.password);
    setLoading(false);
    if (ok) {
      const redirect = search.get("redirect") || "/products";
      navigate(redirect, { replace: true });
    } else {
      setErr("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <Card className="shadow rounded-4" style={{ width: 420, background: "var(--card)" }}>
        <Card.Body>
          <h3 className="text-center mb-3" style={{ color: "var(--brand)" }}>Login</h3>
          {err && <Alert variant="danger" className="py-2">{err}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                autoFocus
                required
                placeholder="Nhập username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPass(s => !s)}
                  title={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
              </div>
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              variant="success"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
