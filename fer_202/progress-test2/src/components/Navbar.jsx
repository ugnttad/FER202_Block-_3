import React, { useState } from "react";
import {Badge,Button,Container,Dropdown,Image,ListGroup,Nav,Navbar as BsNavbar,  Offcanvas,} from "react-bootstrap";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useFavourites } from "../contexts/FavouritesContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { formatPrice } from "../utils/format";
import LoginModal from "./LoginModal"; // dùng import trực tiếp thay vì require

export default function AppNavbar() {   // 👈 đổi tên component
    const { items, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
    const { ids: favIds, count: favCount } = useFavourites();
    const { user, isAuthenticated, logout } = useAuth();
    const { showToast } = useToast();

    const [showCart, setShowCart] = useState(false);
    const [showFav, setShowFav] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        showToast("Đã đăng xuất", "secondary");
    }

    return (
        <BsNavbar bg="light" expand="lg" className="mb-3 shadow-sm sticky-top">
            <Container>
                <BsNavbar.Brand as={Link} to="/products" className="fw-bold">
                    PhoneStore
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="main-nav" />
                <BsNavbar.Collapse id="main-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/products">Sản phẩm</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto align-items-center gap-3">
                        <Button variant="outline-danger" onClick={() => setShowFav(true)} aria-label="Favourites">
                            <FiHeart className="me-1" />
                            <Badge bg="danger" pill>{favCount}</Badge>
                        </Button>

                        <Button variant="outline-success" onClick={() => setShowCart(true)} aria-label="Cart">
                            <FiShoppingCart className="me-1" />
                            <Badge bg="success" pill>{totalItems}</Badge>
                        </Button>

                        {isAuthenticated ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="outline-primary">
                                    <FiUser className="me-1" /> {user?.name || user?.username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate("/products")}>Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setShowFav(true)}>My Favourites</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Button variant="primary" onClick={() => setShowLogin(true)}>
                                <FiUser className="me-1" /> Login
                            </Button>
                        )}
                    </Nav>
                </BsNavbar.Collapse>
            </Container>

            {/* FAVOURITES DRAWER */}
            <Offcanvas show={showFav} onHide={() => setShowFav(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Yêu thích ({favCount})</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {favCount === 0 ? (
                        <div className="text-muted">Chưa có sản phẩm yêu thích.</div>
                    ) : (
                        <div className="small text-muted">Sản phẩm đã đánh dấu sẽ hiện ở đây (nhấn ♥ trên thẻ sản phẩm).</div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>

            {/* CART DRAWER */}
            <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Giỏ hàng ({totalItems})</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {items.length === 0 ? (
                        <div className="text-muted">Giỏ hàng trống.</div>
                    ) : (
                        <>
                            <ListGroup variant="flush" className="mb-3">
                                {items.map((it) => (
                                    <ListGroup.Item key={it.id} className="d-flex align-items-center gap-2">
                                        <Image src={it.image} alt={it.name} width={48} height={48} rounded style={{ objectFit: "cover" }} />
                                        <div className="flex-grow-1">
                                            <div className="fw-semibold">{it.name}</div>
                                            <div className="text-muted">
                                                x{it.qty} · {formatPrice(it.price)}
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline-danger" onClick={() => removeFromCart(it.id)}>
                                            Xóa
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="fw-bold">Tổng:</div>
                                <div className="fs-5">{formatPrice(totalPrice)}</div>
                            </div>
                            <div className="d-flex gap-2">
                                <Button variant="outline-secondary" onClick={clearCart}>Xóa hết</Button>
                                <Button variant="success" onClick={() => { showToast("Thanh toán demo!", "success"); }}>
                                    Thanh toán
                                </Button>
                            </div>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>

            {/* LOGIN MODAL */}
            <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
        </BsNavbar>
    );
}
