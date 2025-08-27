import React, { useContext, useMemo, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Table, Button, Image, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { imgSrc, vnd } from "../../utils/format";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const isEmpty = useMemo(() => cart.length === 0, [cart.length]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const goCheckout = () => {
    if (isEmpty) return setToast({ type: "info", msg: "Your cart is empty." });
    if (!user) {
      setToast({ type: "info", msg: "Please sign in to proceed to checkout." });
      setTimeout(() => navigate(`/login?redirect_uri=${encodeURIComponent("/checkout")}`), 600);
      return;
    }
    navigate("/checkout");
  };

  return (
    <Container className="my-4" style={{ maxWidth: 900 }}>
      {toast && (
        <Alert
          variant={toast.type}
          onClose={() => setToast(null)}
          dismissible
          className="position-fixed top-0 end-0 m-4"
          style={{ zIndex: 9999, minWidth: 240 }}
        >
          {toast.msg}
        </Alert>
      )}
      <div className="card shadow rounded-4">
        <div className="card-body">
          <h3 className="text-success mb-4">Shopping Cart</h3>

          {isEmpty ? (
            <Alert variant="secondary" className="text-center">Your cart is empty.</Alert>
          ) : (
            <>
              <Table hover responsive className="align-middle">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Unit price</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>
                        <Image
                          src={imgSrc(item.image)}
                          alt={item.title}
                          width={60}
                          rounded
                          style={{ objectFit: "cover" }}
                        />
                      </td>
                      <td><b>{item.title}</b></td>
                      <td>
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          className="form-control"
                          style={{ width: 70 }}
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        />
                      </td>
                      <td>{vnd(item.price)}</td>
                      <td>{vnd(item.price * item.qty)}</td>
                      <td className="text-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Remove item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="text-end fw-bold fs-5 text-success mb-3">
                Total: {vnd(total)}
              </div>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="outline-secondary" onClick={clearCart}>Clear cart</Button>
                <Button variant="success" onClick={goCheckout}>
                  <i className="bi bi-credit-card me-2"></i>Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
