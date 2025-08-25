import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Alert } from "react-bootstrap";

export default function PostForm({ initialPost, onSubmit, submitText }) {
    const [title, setTitle] = useState(initialPost?.title || "");
    const [content, setContent] = useState(initialPost?.content || "");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError("Title và Content không được để trống.");
            return;
        }
        setError("");
        onSubmit({ title: title.trim(), content: content.trim() });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập nội dung"
                />
            </Form.Group>

            <Button type="submit">{submitText || "Save"}</Button>
        </Form>
    );
}

PostForm.propTypes = {
    initialPost: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string
};
