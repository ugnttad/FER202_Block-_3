import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

export default function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isNameValid = name.trim() !== "";
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isAgeValid = Number(age) >= 1;

  const isFormValid = isNameValid && isEmailValid && isAgeValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSubmit?.({ name, email, age: Number(age) });
    setShowToast(true);
    setShowModal(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="pfName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!isNameValid && name !== ""}
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="pfEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!isEmailValid && email !== ""}
              />
              <Form.Control.Feedback type="invalid">
                Invalid email
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="pfAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                min={1}
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                isInvalid={!isAgeValid && age !== ""}
              />
              <Form.Control.Feedback type="invalid">
                Age must be ≥ 1
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} className="pt-2">
            <Button type="submit" variant="primary" disabled={!isFormValid}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white">
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal + Card */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="shadow-soft">
            <Card.Body>
              <Row className="mb-2">
                <Col xs={4} className="text-muted">Name</Col>
                <Col xs={8} className="fw-semibold">{name}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4} className="text-muted">Email</Col>
                <Col xs={8} className="fw-semibold">{email}</Col>
              </Row>
              <Row>
                <Col xs={4} className="text-muted">Age</Col>
                <Col xs={8} className="fw-semibold">{age}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
