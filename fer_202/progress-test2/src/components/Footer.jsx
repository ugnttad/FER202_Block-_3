import React from 'react';
import { Container } from 'react-bootstrap';


export default function Footer() {
    return (
        <footer className="mt-auto py-4 border-top" role="contentinfo">
            <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 text-muted small">
                <div>© {new Date().getFullYear()} PhoneStore — All rights reserved.</div>
                <div className="d-flex gap-3">
                    <a href="#about" className="link-secondary text-decoration-none">About</a>
                    <a href="#contact" className="link-secondary text-decoration-none">Contact</a>
                    <a href="#privacy" className="link-secondary text-decoration-none">Privacy</a>
                </div>
            </Container>
        </footer>
    );
}