import PropTypes from 'prop-types';
import { Card, Form, Row, Col } from 'react-bootstrap';

export default function AddressForm({ values, errors, showErrors, touched, onChange, onBlur, countries }) {
    const invalid = (field) => (showErrors || touched?.[field]) && !!errors[field];

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group controlId="streetName">
                            <Form.Label>Street Name</Form.Label>
                            <Form.Control
                                value={values.streetName}
                                onChange={(e) => onChange('address', 'streetName', e.target.value)}
                                onBlur={() => onBlur('address', 'streetName')}
                                isInvalid={invalid('streetName')}
                                placeholder="Street Name"
                            />
                            <Form.Control.Feedback type="invalid">{errors.streetName}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="streetNumber">
                            <Form.Label>Street Number</Form.Label>
                            <Form.Control
                                value={values.streetNumber}
                                onChange={(e) => onChange('address', 'streetNumber', e.target.value)}
                                onBlur={() => onBlur('address', 'streetNumber')}
                                isInvalid={invalid('streetNumber')}
                                placeholder="Street Number"
                            />
                            <Form.Control.Feedback type="invalid">{errors.streetNumber}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="g-3 mt-1">
                    <Col md={6}>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                value={values.city}
                                onChange={(e) => onChange('address', 'city', e.target.value)}
                                onBlur={() => onBlur('address', 'city')}
                                isInvalid={invalid('city')}
                                placeholder="City"
                            />
                            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Select
                                value={values.country}
                                onChange={(e) => onChange('address', 'country', e.target.value)}
                                onBlur={() => onBlur('address', 'country')}
                                isInvalid={invalid('country')}
                            >
                                <option value="">-- Select country --</option>
                                {countries.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

AddressForm.propTypes = {
    values: PropTypes.shape({
        streetName: PropTypes.string,
        streetNumber: PropTypes.string,
        city: PropTypes.string,
        country: PropTypes.string,
    }).isRequired,
    errors: PropTypes.object.isRequired,
    showErrors: PropTypes.bool,
    touched: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
};
