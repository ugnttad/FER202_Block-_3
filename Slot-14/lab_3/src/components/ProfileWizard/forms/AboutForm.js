import PropTypes from 'prop-types';
import { Card, Form, Row, Col, Image } from 'react-bootstrap';

export default function AboutForm({ values, errors, showErrors, touched, onChange, onBlur, onFileChange }) {
    const invalid = (field) => (showErrors || touched?.[field]) && !!errors[field];

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <Row className="g-4">
                    <Col sm={4} className="text-center">
                        <div className="d-inline-block border rounded-circle p-1">
                            <Image
                                roundedCircle
                                width={120}
                                height={120}
                                alt="avatar preview"
                                src={values.avatarUrl || 'https://via.placeholder.com/120x120?text=Avatar'}
                            />
                        </div>
                        <Form.Group controlId="avatar" className="mt-3">
                            <Form.Label className="fw-semibold">Choose picture</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                onBlur={() => onBlur('about', 'avatar')}
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={8}>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                value={values.firstName}
                                onChange={(e) => onChange('about', 'firstName', e.target.value)}
                                onBlur={() => onBlur('about', 'firstName')}
                                isInvalid={invalid('firstName')}
                                placeholder="First Name"
                            />
                            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                value={values.lastName}
                                onChange={(e) => onChange('about', 'lastName', e.target.value)}
                                onBlur={() => onBlur('about', 'lastName')}
                                isInvalid={invalid('lastName')}
                                placeholder="Last Name"
                            />
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={values.email}
                                onChange={(e) => onChange('about', 'email', e.target.value)}
                                onBlur={() => onBlur('about', 'email')}
                                isInvalid={invalid('email')}
                                placeholder="you@example.com"
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

AboutForm.propTypes = {
    values: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        avatarUrl: PropTypes.string,
    }).isRequired,
    errors: PropTypes.object.isRequired,
    showErrors: PropTypes.bool,
    touched: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired,
};
