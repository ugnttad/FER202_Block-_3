import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function AppNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="md" fixed="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/free">Movie Explorer</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto" navbarScroll>
                        <Nav.Link as={NavLink} to="/free" end>Free Movies</Nav.Link>
                        <Nav.Link as={NavLink} to="/favourites">My Favourite Movies</Nav.Link>
                        <Nav.Link as={NavLink} to="/request">Movie Request Form</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}