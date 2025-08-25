import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Container, Navbar, Nav, Spinner } from "react-bootstrap";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Login = lazy(() => import("./components/Login"));
const PostList = lazy(() => import("./components/PostList"));
const CreatePost = lazy(() => import("./components/CreatePost"));
const EditPost = lazy(() => import("./components/EditPost"));
const DeletePost = lazy(() => import("./components/DeletePost"));

function RequireAuth() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

function TopBar() {
  const { user, logout } = useAuth();
  return (
    <Navbar bg="light" className="mb-3 px-3" expand="sm">
      <Navbar.Brand>Post Manager</Navbar.Brand>
      <Nav className="ms-auto">
        {user ? (
          <>
            <Navbar.Text className="me-3">Welcome, <strong>{user.username}</strong></Navbar.Text>
            <Nav.Link onClick={logout}>Sign out</Nav.Link>
          </>
        ) : null}
      </Nav>
    </Navbar>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <TopBar />
        <Container className="py-2">
          <Suspense fallback={<div className="d-flex justify-content-center"><Spinner /></div>}>
            <Routes>
              {/* Home = Login */}
              <Route path="/" element={<Login />} />

              {/* Vùng cần đăng nhập */}
              <Route element={<RequireAuth />}>
                <Route path="/posts" element={<PostList />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/edit/:id" element={<EditPost />} />
                <Route path="/delete/:id" element={<DeletePost />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Container>
      </Router>
    </AuthProvider>
  );
}
   