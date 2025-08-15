import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { allGenres } from '../data/movies'

const initial = { title: '', genre: '', year: '', duration: '', description: '' }

export default function RequestForm() {
    const [form, setForm] = useState(initial)
    const [submitted, setSubmitted] = useState(false)
    const [validated, setValidated] = useState(false)

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    const errors = {
        title: !form.title.trim() ? 'Title is required' : '',
        genre: !form.genre ? 'Genre is required' : '',
        year: !form.year || Number(form.year) <= 1900 ? 'Year must be > 1900' : '',
        duration: !form.duration || Number(form.duration) <= 0 ? 'Duration must be > 0' : '',
        description: !form.description || form.description.trim().length < 30 ? 'Description must be at least 30 characters' : '',
    }

    const hasErrors = Object.values(errors).some(Boolean)

    const handleSubmit = (e) => {
        e.preventDefault()
        setValidated(true)
        if (!hasErrors) {
            setSubmitted(true)
            setForm(initial)
            setValidated(false)
        }
    }

    return (
        <>
            <h4 className="mb-3">Movie Request Form</h4>
            {submitted && <Alert variant="success" className="mb-3">Request submitted. Thank you!</Alert>}
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        isInvalid={validated && !!errors.title}
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        placeholder="e.g., Journey to Mars"
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="genre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Select
                        isInvalid={validated && !!errors.genre}
                        name="genre"
                        value={form.genre}
                        onChange={onChange}
                    >
                        <option value="">Choose...</option>
                        {allGenres.filter((g) => g !== 'All').map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="number"
                        isInvalid={validated && !!errors.year}
                        name="year"
                        value={form.year}
                        onChange={onChange}
                        placeholder="2024"
                    />
                    <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Form.Control
                        type="number"
                        isInvalid={validated && !!errors.duration}
                        name="duration"
                        value={form.duration}
                        onChange={onChange}
                        placeholder="120"
                    />
                    <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea" rows={5}
                        isInvalid={validated && !!errors.description}
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        placeholder="Describe the movie (at least 30 characters)…"
                    />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary">Submit Request</Button>
            </Form>
        </>
    )
}