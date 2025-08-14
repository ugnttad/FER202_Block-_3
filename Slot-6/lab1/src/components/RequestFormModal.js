import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { BsSend } from 'react-icons/bs';

export default function RequestFormModal({ show, onHide, onSubmitted }) {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated'); // chỉ sau khi bấm Submit mới hiện feedback
      return;
    }

    // Lấy dữ liệu form (tuỳ bạn có cần gửi API không)
    const payload = Object.fromEntries(new FormData(form).entries());

    // Reset form & feedback cho lần sau
    form.reset();
    form.classList.remove('was-validated');

    // Báo cho App để hiện Toast + (tuỳ chọn) đóng modal
    onSubmitted?.(payload);
    onHide?.();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Recipe Request Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form ref={formRef} noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="reqName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter your name" required />
            <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reqEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter your email" required />
            <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reqIngredient">
            <Form.Label>Desired Ingredient</Form.Label>
            <Form.Control name="ingredient" type="text" placeholder="Ví dụ: gà, cá hồi, nấm..." required />
            <Form.Control.Feedback type="invalid">Please describe an ingredient</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reqPrep">
            <Form.Label>Max Prep Time</Form.Label>
            <Form.Select name="prepTime" defaultValue="" required>
              <option value="" disabled>Chọn thời gian tối đa</option>
              <option value="5">5 phút</option>
              <option value="10">10 phút</option>
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please choose a max prep time</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reqNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control name="notes" as="textarea" rows={4} placeholder="Ghi chú thêm (3–5 dòng)" required />
            <Form.Control.Feedback type="invalid">Please add some notes</Form.Control.Feedback>
          </Form.Group>

          <div className="text-end">
            <Button variant="primary" type="submit">
              <BsSend className="me-2" /> Submit Request
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
