import React, { useEffect, useMemo, useReducer, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Nav, ProgressBar, Toast, ToastContainer } from 'react-bootstrap';
import AboutForm from './forms/AboutForm';
import AccountForm from './forms/AccountForm';
import AddressForm from './forms/AddressForm';
import SummaryModal from './SummaryModal';
import { validateAbout, validateAccount, validateAddress } from './utils/validators';

const COUNTRIES = ['Viet Nam', 'Korea', 'Italy', 'Japan', 'France', 'USA'];

const initial = {
    step: 0,
    about: { firstName: '', lastName: '', email: '', avatar: null, avatarUrl: '' },
    account: { username: '', password: '', confirm: '', question: '', answer: '' },
    address: { streetName: '', streetNumber: '', city: '', country: '' },
};

function reducer(state, action) {
    switch (action.type) {
        case 'update': {
            const { segment, field, value } = action;
            return { ...state, [segment]: { ...state[segment], [field]: value } };
        }
        case 'setStep':
            return { ...state, step: action.step };
        case 'reset':
            return initial;
        default:
            return state;
    }
}

export default function BuildProfileWizard({ show, onClose }) {
    const [state, dispatch] = useReducer(reducer, initial);
    const [showErrors, setShowErrors] = useState(false);
    const [touched, setTouched] = useState({ about: {}, account: {}, address: {} });
    const [showToast, setShowToast] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    // clean up ObjectURL for avatar
    useEffect(() => {
        return () => {
            if (state.about.avatarUrl) URL.revokeObjectURL(state.about.avatarUrl);
        };
    }, [state.about.avatarUrl]);

    // validations
    const aboutErrors = useMemo(() => validateAbout(state.about), [state.about]);
    const accountErrors = useMemo(() => validateAccount(state.account), [state.account]);
    const addressErrors = useMemo(() => validateAddress(state.address), [state.address]);

    const isStepValid = useMemo(() => {
        const errsByStep = [aboutErrors, accountErrors, addressErrors][state.step];
        return Object.keys(errsByStep).length === 0;
    }, [state.step, aboutErrors, accountErrors, addressErrors]);

    const allValid = useMemo(
        () => [aboutErrors, accountErrors, addressErrors].every((e) => Object.keys(e).length === 0),
        [aboutErrors, accountErrors, addressErrors]
    );

    const progress = useMemo(() => {
        const flags = [aboutErrors, accountErrors, addressErrors].map((e) => Object.keys(e).length === 0);
        const completedBefore = flags.slice(0, state.step).filter(Boolean).length;
        const current = isStepValid ? 1 : 0;
        return Math.round(((completedBefore + current) / 3) * 100);
    }, [aboutErrors, accountErrors, addressErrors, state.step, isStepValid]);

    // handlers
    const onFieldChange = useCallback((segment, field, value) => {
        dispatch({ type: 'update', segment, field, value });
    }, []);

    const onFieldBlur = useCallback((segment, field) => {
        setTouched((prev) => ({ ...prev, [segment]: { ...prev[segment], [field]: true } }));
    }, []);

    const onFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            dispatch({ type: 'update', segment: 'about', field: 'avatar', value: file });
            dispatch({ type: 'update', segment: 'about', field: 'avatarUrl', value: url });
            setTouched((prev) => ({ ...prev, about: { ...prev.about, avatar: true } }));
        }
    }, []);

    const nextStep = useCallback(() => {
        if (!isStepValid) {
            setShowErrors(true);
            return;
        }
        setShowErrors(false);
        dispatch({ type: 'setStep', step: Math.min(2, state.step + 1) });
    }, [isStepValid, state.step]);

    const prevStep = useCallback(() => {
        setShowErrors(false);
        dispatch({ type: 'setStep', step: Math.max(0, state.step - 1) });
    }, [state.step]);

    const finish = useCallback(() => {
        if (!allValid) {
            setShowErrors(true);
            return;
        }
        setShowErrors(false);
        setShowSummary(true);
        setShowToast(true);
        onClose();
    }, [allValid, onClose]);

    const closeWizard = useCallback(() => {
        setShowErrors(false);
        dispatch({ type: 'setStep', step: 0 });
        onClose();
    }, [onClose]);

    return (
        <>
            <Modal show={show} onHide={closeWizard} size="lg" backdrop="static" centered>
                <Modal.Header closeButton>
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="m-0">Build Your Profile</h5>
                            <div className="flex-grow-1 ms-4">
                                <ProgressBar now={progress} label={`${progress}%`} />
                            </div>
                        </div>
                        <Nav variant="tabs" activeKey={state.step} onSelect={() => { }}>
                            <Nav.Item><Nav.Link eventKey={0}>About</Nav.Link></Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={1} disabled={Object.keys(aboutErrors).length !== 0}>Account</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={2} disabled={Object.keys(accountErrors).length !== 0}>Address</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Modal.Header>

                <Modal.Body className="bg-light">
                    {state.step === 0 && (
                        <AboutForm
                            values={state.about}
                            errors={aboutErrors}
                            showErrors={showErrors}
                            touched={touched.about}
                            onChange={onFieldChange}
                            onBlur={onFieldBlur}
                            onFileChange={onFileChange}
                        />
                    )}
                    {state.step === 1 && (
                        <AccountForm
                            values={state.account}
                            errors={accountErrors}
                            showErrors={showErrors}
                            touched={touched.account}
                            onChange={onFieldChange}
                            onBlur={onFieldBlur}
                        />
                    )}
                    {state.step === 2 && (
                        <AddressForm
                            values={state.address}
                            errors={addressErrors}
                            showErrors={showErrors}
                            touched={touched.address}
                            onChange={onFieldChange}
                            onBlur={onFieldBlur}
                            countries={COUNTRIES}
                        />
                    )}
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="outline-secondary" onClick={prevStep} disabled={state.step === 0}>Previous</Button>
                    {state.step < 2 ? (
                        <Button variant="success" onClick={nextStep} disabled={!isStepValid}>Next</Button>
                    ) : (
                        <Button variant="success" onClick={finish} disabled={!allValid}>Finish</Button>
                    )}
                </Modal.Footer>
            </Modal>

            <SummaryModal show={showSummary} onHide={() => setShowSummary(false)} state={state} />

            <ToastContainer position="top-end" className="p-3">
                <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={2500} autohide>
                    <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

BuildProfileWizard.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
