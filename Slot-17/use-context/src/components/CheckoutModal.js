import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { Modal, Toast } from "bootstrap";        // <-- import class trực tiếp
import { useCart } from "../context/CartContext";

export default function CheckoutModal() {
  const { items, total, clear } = useCart();
  const modalRef = useRef(null);
  const toastRef = useRef(null);

  const handlePay = () => {
    clear();
    // Đóng modal & mở toast bằng API class (không dùng window.bootstrap)
    const modal = Modal.getOrCreateInstance(modalRef.current);
    modal.hide();
    const toast = Toast.getOrCreateInstance(toastRef.current);
    toast.show();
  };

  const node = (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="checkoutModal"
        tabIndex="-1"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Order Summary</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <ul className="list-group list-group-flush">
                {items.map((it) => (
                  <li key={it.id} className="list-group-item d-flex justify-content-between">
                    <span>{it.name}</span>
                    <span>${parseFloat(it.price).toFixed(2)}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between fw-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </li>
              </ul>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success" onClick={handlePay}>Pay now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div
          ref={toastRef}
          className="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-delay="2000"
        >
          <div className="d-flex">
            <div className="toast-body">Payment successful. Thank you!</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </>
  );

  // Render vào <body> để tránh xung đột z-index/transform
  return createPortal(node, document.body);
}
