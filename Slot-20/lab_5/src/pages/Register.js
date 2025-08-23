import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default function Register() {
    const [form, setForm] = useState({ username: "", password: "", displayName: "" });
    const [ok, setOk] = useState(false);
    const submit = e => { e.preventDefault(); setOk(true); /* POST json-server nếu muốn */ };
    return (
        <Form className="container card p-4 shadow bg-light" style={{ maxWidth: 480 }} onSubmit={submit}>
            <h3 className="text-success mb-3">Register account</h3>
            {ok && <Alert variant="success">Đăng ký tạm thời thành công (demo)!</Alert>}
            <Form.Group className="mb-2"><Form.Label>Username</Form.Label><Form.Control value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Password</Form.Label><Form.Control type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Display name</Form.Label><Form.Control value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} required /></Form.Group>
            <Button type="submit" variant="success" className="w-100">Create account</Button>
        </Form>
    );
}
