import React from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';

export default function NavbarHeader({ favouriteCount, onShowRequestForm }) {
  return (
    <Navbar bg="light" expand="lg" className="mb-3 shadow-sm">
      <Container>
        <Navbar.Brand href="#">🍳 Recipes</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link href="#recipes">Recipes</Nav.Link>
            <Nav.Link onClick={onShowRequestForm} role="button">Recipe Request Form</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="position-relative">
              Favourites{' '}
              <Badge bg="primary" pill className="badge-pointer">{favouriteCount}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}