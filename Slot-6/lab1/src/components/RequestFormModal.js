import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { BsSend } from 'react-icons/bs';

export default function RequestFormModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Recipe Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3" controlId="reqName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
            <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reqEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
            <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reqIngredient">
            <Form.Label>Desired Ingredient</Form.Label>
            <Form.Control type="text" placeholder="Ví dụ: " />
            <Form.Control.Feedback type="invalid">Please describe an ingredient</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reqPrep">
            <Form.Label>Max Prep Time</Form.Label>
            <Form.Select defaultValue="">
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
            <Form.Control as="textarea" rows={4} placeholder="Ghi chú thêm (3–5 dòng)" />
            <Form.Control.Feedback type="invalid">Please add some notes</Form.Control.Feedback>
          </Form.Group>

          <div className="text-end">
            <Button variant="primary">
              <BsSend className="me-2" /> Submit Request
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}