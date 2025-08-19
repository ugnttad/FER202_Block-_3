import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function StudentDetailModal({ student, onClose }) {
  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          <Col xs="auto">
            {student.avatar ? (
              <Image src={student.avatar} alt={student.name} rounded style={{ width: 96, height: 96, objectFit: "cover" }} />
            ) : (
              <div style={{ width: 96, height: 96, borderRadius: 12, background: "#e9ecef" }} />
            )}
          </Col>
          <Col>
            <div className="small text-muted">ID</div>
            <div className="fw-semibold mb-2">{student.id}</div>

            <div className="small text-muted">Name</div>
            <div className="fw-semibold mb-2">{student.name}</div>

            <div className="small text-muted">Email</div>
            <div className="fw-semibold mb-2">{student.email}</div>

            <div className="small text-muted">Age</div>
            <div className="fw-semibold">{student.age}</div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

StudentDetailModal.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number,
    avatar: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
