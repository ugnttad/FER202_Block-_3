// validators.js
export const required = (v) => v !== undefined && String(v).trim() !== '';
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isUsername = (v) => typeof v === 'string' && v.length >= 6;
export const isStrongPassword =
    (v) => /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(v);

export function validateAbout(values) {
    const e = {};
    if (!required(values.firstName)) e.firstName = 'Please enter your first name';
    if (!required(values.lastName)) e.lastName = 'Please enter your last name';
    if (!required(values.email)) e.email = 'Please enter your email';
    else if (!isEmail(values.email)) e.email = 'Invalid email';
    return e;
}
export function validateAccount(values) {
    const e = {};
    if (!required(values.username)) e.username = 'Username is required';
    else if (!isUsername(values.username)) e.username = 'At least 6 characters';
    if (!required(values.password)) e.password = 'Password is required';
    else if (!isStrongPassword(values.password)) {
        e.password = '≥8 chars, include uppercase, number, special';
    }
    if (!required(values.confirm)) e.confirm = 'Confirm your password';
    else if (values.confirm !== values.password) e.confirm = 'Passwords do not match';
    if (!required(values.question)) e.question = 'Select a secret question';
    if (!required(values.answer)) e.answer = 'Provide an answer';
    return e;
}
export function validateAddress(values) {
    const e = {};
    if (!required(values.streetName)) e.streetName = 'Street name is required';
    if (!required(values.streetNumber)) e.streetNumber = 'Street number is required';
    if (!required(values.city)) e.city = 'City is required';
    if (!required(values.country)) e.country = 'Country is required';
    return e;
}
