import React from "react";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function AppNavbar({ search, setSearch, onOpenWizard }) {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand className="fw-bold">🎓 Students</Navbar.Brand>
        <Navbar.Toggle aria-controls="topbar" />
        <Navbar.Collapse id="topbar">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#students">Students</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link onClick={onOpenWizard}>Build your Profile</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <InputGroup>
              <InputGroup.Text id="quickSearch">🔎</InputGroup.Text>
              <Form.Control
                aria-describedby="quickSearch"
                type="text"
                placeholder="Quick search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

AppNavbar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  onOpenWizard: PropTypes.func.isRequired,
};
