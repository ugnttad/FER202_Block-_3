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
    const [uploading, setUploading] = useState(false);
    const [checking, setChecking] = useState(false); // ⬅ kiểm tra trùng
    const pct = useMemo(() => (step === 1 ? 50 : 100), [step]);

    const onAvatar = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type) || file.size > 2 * 1024 * 1024) {
            setError("Avatar must be JPG/PNG/WEBP/AVIF and ≤ 2MB");
            return;
        }
        const url = URL.createObjectURL(file);
        setAbout(a => ({ ...a, avatar: file, avatarUrl: url }));
    };

    const validateStep1 = () => {
        if (!about.name.trim()) return "Please enter your full name.";
        if (!about.email.includes("@")) return "Invalid email.";
        return "";
    };
    const validateStep2 = () => {
        const { password } = account;
        if (!account.username.trim()) return "Username is required.";
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[^A-Za-z0-9]/.test(password))
            return "Password must be ≥6 and include upper/lowercase & a special character.";
        if (account.confirm !== password) return "Password confirmation does not match.";
        if (!account.answer.trim()) return "Please provide an answer to the secret question.";
        return "";
    };

    const next = () => { const e = validateStep1(); if (e) setError(e); else { setError(""); setStep(2); } };
    const prev = () => setStep(1);

    // Upload avatar lên http://localhost:3002/upload
    const uploadAvatar = async (file) => {
        const fd = new FormData();
        fd.append("avatar", file);
        setUploading(true);
        try {
            const res = await fetch("http://localhost:3002/upload", { method: "POST", body: fd });
            if (!res.ok) throw new Error("UPLOAD_FAILED");
            const data = await res.json();
            return data.filename; // ví dụ: avatar_1724xxxx.png
        } finally {
            setUploading(false);
        }
    };

    // 🔎 Kiểm tra trùng username/email trên db.json
    const checkAvailability = async (email, username) => {
        setChecking(true);
        try {
            const [re1, re2] = await Promise.all([
                fetch(`http://localhost:3001/accounts?email=${encodeURIComponent(email)}`),
                fetch(`http://localhost:3001/accounts?username=${encodeURIComponent(username)}`)
            ]);
            const [arr1, arr2] = await Promise.all([re1.json(), re2.json()]);
            const dupEmail = Array.isArray(arr1) && arr1.some(a => (a.email || "").toLowerCase() === email.toLowerCase());
            const dupUsername = Array.isArray(arr2) && arr2.some(a => (a.username || "").toLowerCase() === username.toLowerCase());
            return { dupEmail, dupUsername };
        } catch {
            // Nếu lỗi mạng/api, coi như không trùng để không chặn — nhưng hiển thị cảnh báo
            return { dupEmail: false, dupUsername: false, warn: true };
        } finally {
            setChecking(false);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        const err = validateStep2();
        if (err) return setError(err);
        setError("");

        const email = about.email.trim();
        const username = account.username.trim();

        // 1) Check trùng trước khi upload/đăng ký
        const { dupEmail, dupUsername, warn } = await checkAvailability(email, username);
        if (warn) {
            // tuỳ chọn: có thể hiện toast warning, ở đây bỏ qua để UX gọn
        }
        if (dupEmail || dupUsername) {
            const msgs = [];
            if (dupEmail) msgs.push("Email is already in use.");
            if (dupUsername) msgs.push("Username is already taken.");
            setError(msgs.join(" "));
            return;
        }

        // 2) Upload ảnh nếu có
        let avatarName = "";
        try {
            if (about.avatar) avatarName = await uploadAvatar(about.avatar);
        } catch {
            return setError("Avatar upload failed. Please try again.");
        }

        // 3) Gửi đăng ký lên json-server
        const payload = {
            name: about.name.trim(),
            email,
            avatar: avatarName,            // chỉ lưu tên file; imgSrc() sẽ map thành /images/<tên>
            username,
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
            setError("Cannot register right now. Please try again.");
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
                            <Form.Label>Avatar (≤2MB, jpg/png/webp/avif)</Form.Label>
                            <Form.Control type="file" accept="image/png,image/jpeg,image/webp,image/avif" onChange={onAvatar} />
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
                            <Button type="button" variant="secondary" onClick={prev} disabled={uploading || checking}>Previous</Button>
                            <Button type="submit" variant="success" disabled={uploading || checking}>
                                {checking ? "Checking..." : (uploading ? "Uploading avatar..." : "Submit")}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </Container>
    );
}
