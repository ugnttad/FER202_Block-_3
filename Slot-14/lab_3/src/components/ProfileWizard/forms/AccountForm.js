import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function AccountForm({ values, errors, showErrors, touched, onChange, onBlur }) {
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const invalid = (field) => (showErrors || touched?.[field]) && !!errors[field];

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={values.username}
                                onChange={(e) => onChange('account', 'username', e.target.value)}
                                onBlur={() => onBlur('account', 'username')}
                                isInvalid={invalid('username')}
                                placeholder="At least 6 characters"
                            />
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="g-3 mt-1">
                    <Col md={6}>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPwd ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={(e) => onChange('account', 'password', e.target.value)}
                                    onBlur={() => onBlur('account', 'password')}
                                    isInvalid={invalid('password')}
                                    placeholder="Min 8, uppercase, number, special"
                                />
                                <InputGroup.Text role="button" onClick={() => setShowPwd((s) => !s)}>
                                    {showPwd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showConfirm ? 'text' : 'password'}
                                    value={values.confirm}
                                    onChange={(e) => onChange('account', 'confirm', e.target.value)}
                                    onBlur={() => onBlur('account', 'confirm')}
                                    isInvalid={invalid('confirm')}
                                    placeholder="Re-enter password"
                                />
                                <InputGroup.Text role="button" onClick={() => setShowConfirm((s) => !s)}>
                                    {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="g-3 mt-1">
                    <Col md={6}>
                        <Form.Group controlId="question">
                            <Form.Label>Secret Question</Form.Label>
                            <Form.Select
                                value={values.question}
                                onChange={(e) => onChange('account', 'question', e.target.value)}
                                onBlur={() => onBlur('account', 'question')}
                                isInvalid={invalid('question')}
                            >
                                <option value="">-- Choose a question --</option>
                                <option>What is your first pet’s name?</option>
                                <option>What is your mother’s maiden name?</option>
                                <option>In which city were you born?</option>
                                <option>Who was your favorite teacher?</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.question}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="answer">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                value={values.answer}
                                onChange={(e) => onChange('account', 'answer', e.target.value)}
                                onBlur={() => onBlur('account', 'answer')}
                                isInvalid={invalid('answer')}
                            />
                            <Form.Control.Feedback type="invalid">{errors.answer}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

AccountForm.propTypes = {
    values: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        confirm: PropTypes.string,
        question: PropTypes.string,
        answer: PropTypes.string,
    }).isRequired,
    errors: PropTypes.object.isRequired,
    showErrors: PropTypes.bool,
    touched: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};
