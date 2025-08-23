import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './components/Home';
import About from './components/About';
import Navigation from './components/Navigation';
import Post from './components/Post';
import PostDetail from './components/PostDetail';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <h1 style={{ margin: '16px' }}>React Router Example</h1>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />

          {/* Danh sách post để public */}
          <Route path="/posts" element={<Post />} />

          {/* Chi tiết post yêu cầu đăng nhập -> sẽ auto chuyển tới /login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/post/:id" element={<PostDetail />} />
          </Route>
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
