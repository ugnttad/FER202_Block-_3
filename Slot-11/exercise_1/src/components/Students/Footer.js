import React from "react";
import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <footer className="border-top py-4 bg-white mt-4">
      <Container className="text-center text-muted small">
        © {new Date().getFullYear()} Student Management
      </Container>
    </footer>
  );
}
