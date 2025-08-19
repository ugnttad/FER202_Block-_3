import PropTypes from 'prop-types';
import { Modal, Card, Row, Col, Image } from 'react-bootstrap';

export default function SummaryModal({ show, onHide, state }) {
    const { about, account, address } = state;
    const masked = account.password ? '•'.repeat(Math.max(8, account.password.length)) : '';

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Your Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="g-4">
                    <Col md={4} className="text-center">
                        <Image
                            roundedCircle
                            width={140}
                            height={140}
                            alt="avatar"
                            src={about.avatarUrl || 'https://via.placeholder.com/140x140?text=Avatar'}
                        />
                    </Col>
                    <Col md={8}>
                        <Card className="mb-3 shadow-sm">
                            <Card.Header className="fw-bold">About</Card.Header>
                            <Card.Body>
                                <div><strong>First Name:</strong> {about.firstName}</div>
                                <div><strong>Last Name:</strong> {about.lastName}</div>
                                <div><strong>Email:</strong> {about.email}</div>
                            </Card.Body>
                        </Card>

                        <Card className="mb-3 shadow-sm">
                            <Card.Header className="fw-bold">Account</Card.Header>
                            <Card.Body>
                                <div><strong>Username:</strong> {account.username}</div>
                                <div><strong>Password:</strong> {masked}</div>
                                <div><strong>Secret Question:</strong> {account.question}</div>
                                <div><strong>Answer:</strong> {account.answer}</div>
                            </Card.Body>
                        </Card>

                        <Card className="shadow-sm">
                            <Card.Header className="fw-bold">Address</Card.Header>
                            <Card.Body>
                                <div><strong>Street:</strong> {address.streetNumber} {address.streetName}</div>
                                <div><strong>City:</strong> {address.city}</div>
                                <div><strong>Country:</strong> {address.country}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

SummaryModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    state: PropTypes.shape({
        about: PropTypes.object,
        account: PropTypes.object,
        address: PropTypes.object,
    }).isRequired,
};
