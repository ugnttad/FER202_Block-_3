import React, { useEffect, useState } from "react";
import client from "../api/client";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card, Button, Spinner, Alert } from "react-bootstrap";

export default function DeletePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await client.get(`/posts/${id}`);
                setPost(res.data);
            } catch {
                setErr("Không tìm thấy bài viết.");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleDelete = async () => {
        try {
            await client.delete(`/posts/${id}`);
            navigate("/posts");
        } catch {
            setErr("Xoá bài viết thất bại.");
        }
    };

    if (loading) return <Spinner />;
    if (err) return <Alert variant="danger">{err}</Alert>;

    return (
        <Card>
            <Card.Body>
                <Card.Title>Xoá bài viết</Card.Title>
                <Card.Text>
                    Bạn chắc chắn muốn xoá bài viết: <strong>{post?.title}</strong>?
                </Card.Text>
                <div className="d-flex gap-2">
                    <Button variant="danger" onClick={handleDelete}>Xoá</Button>
                    <Button as={Link} to="/posts" variant="secondary">Huỷ</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
