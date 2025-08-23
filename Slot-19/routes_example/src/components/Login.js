import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Mặc định quay về /posts sau khi login
  const from = location.state?.from?.pathname || '/posts';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      login();
      navigate(from, { replace: true });
    } else {
      setErr('Sai tài khoản hoặc mật khẩu (admin / 123456)');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Login</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Username: </label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
