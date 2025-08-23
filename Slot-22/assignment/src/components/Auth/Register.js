import React, { useContext, useMemo, useState, useEffect } from "react";
import { Form, Button, Container, ProgressBar, Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const questions = ["Your favorite color?", "Your pet name?", "Your birth city?"];

export default function Register() {
    const navigate = useNavigate();
    const [sp] = useSearchParams();
    const redirect = sp.get("redirect_uri") || "/";
    const { register } = useContext(AuthContext);

    const [step, setStep] = useState(1);
    const [about, setAbout] = useState({ name: "", email: "", avatar: null, avatarUrl: "" });
    const [account, setAccount] = useState({ username: "", password: "", confirm: "", secretQuestion: questions[0], answer: "" });
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);
    const pct = useMemo(() => (step === 1 ? 50 : 100), [step]);

    const onAvatar = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!["image/jpeg", "image/png"].includes(file.type) || file.size > 2 * 1024 * 1024) {
            setError("Avatar phải là JPG/PNG và ≤ 2MB");
            return;
        }
        const url = URL.createObjectURL(file);
        setAbout(a => ({ ...a, avatar: file, avatarUrl: url }));
    };

    const validateStep1 = () => {
        if (!about.name.trim()) return "Vui lòng nhập họ tên";
        if (!about.email.includes("@")) return "Email không hợp lệ";
        return "";
    };
    const validateStep2 = () => {
        const { password } = account;
        if (!account.username.trim()) return "Username bắt buộc";
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[^A-Za-z0-9]/.test(password))
            return "Mật khẩu ≥6, có hoa, thường, ký tự đặc biệt";
        if (account.confirm !== password) return "Xác nhận mật khẩu không khớp";
        if (!account.answer.trim()) return "Vui lòng nhập câu trả lời bí mật";
        return "";
    };

    const next = () => { const e = validateStep1(); if (e) setError(e); else { setError(""); setStep(2); } };
    const prev = () => setStep(1);

    const submit = async (e) => {
        e.preventDefault();
        const err = validateStep2();
        if (err) return setError(err);
        setError("");

        const payload = {
            name: about.name.trim(),
            email: about.email.trim(),
            avatar: about.avatar ? about.avatar.name : "",
            username: account.username.trim(),
            password: account.password,
            secretQuestion: account.secretQuestion,
            answer: account.answer,
            role: "user",
            wishlist: []
        };

        const ok = await register(payload);
        if (ok) {
            setToast({ type: "success", msg: "Registration successful. You are now signed in." });
            setTimeout(() => navigate(redirect, { replace: true }), 900);
        } else {
            setError("Không thể đăng ký. Vui lòng thử lại.");
        }
    };

    useEffect(() => () => about.avatarUrl && URL.revokeObjectURL(about.avatarUrl), [about.avatarUrl]);

    return (
        <Container style={{ maxWidth: 560 }} className="py-4">
            <h3 className="mb-3">Create an account</h3>
            <ProgressBar now={pct} className="mb-3" />
            {toast && <Alert variant={toast.type} onClose={() => setToast(null)} dismissible>{toast.msg}</Alert>}
            {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

            <Form onSubmit={submit} className="card p-4 shadow">
                {step === 1 && (
                    <>
                        <h5 className="mb-3">About</h5>
                        <Form.Group className="mb-3">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control value={about.name} onChange={(e) => setAbout({ ...about, name: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={about.email} onChange={(e) => setAbout({ ...about, email: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Avatar (≤2MB, jpg/png)</Form.Label>
                            <Form.Control type="file" accept="image/png,image/jpeg" onChange={onAvatar} />
                            {about.avatarUrl && <img src={about.avatarUrl} alt="avatar" className="mt-2 rounded" style={{ width: 96, height: 96, objectFit: "cover" }} />}
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button type="button" onClick={next}>Next</Button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h5 className="mb-3">Account</h5>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={account.username} onChange={(e) => setAccount({ ...account, username: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm</Form.Label>
                            <Form.Control type="password" value={account.confirm} onChange={(e) => setAccount({ ...account, confirm: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Secret question</Form.Label>
                            <Form.Select value={account.secretQuestion} onChange={(e) => setAccount({ ...account, secretQuestion: e.target.value })}>
                                {questions.map(q => <option key={q} value={q}>{q}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control value={account.answer} onChange={(e) => setAccount({ ...account, answer: e.target.value })} required />
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button type="button" variant="secondary" onClick={prev}>Previous</Button>
                            <Button type="submit" variant="success">Submit</Button>
                        </div>
                    </>
                )}
            </Form>
        </Container>
    );
}
