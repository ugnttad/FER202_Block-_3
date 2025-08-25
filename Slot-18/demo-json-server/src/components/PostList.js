import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import { getCache, setCache } from "../utils/cache";
import { Table, Button, Modal, Spinner, Alert } from "react-bootstrap";

export default function PostList() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [toDelete, setToDelete] = useState(null); // {id, title}
    const cacheKey = "posts_cache_v1";

    useEffect(() => {
        // thử lấy cache trước cho cảm giác "nhanh"
        const cached = getCache(cacheKey, 30000);
        if (cached) {
            setPosts(cached);
            setLoading(false);
        }
        // luôn revalidate
        (async () => {
            try {
                const res = await client.get("/posts");
                setPosts(res.data);
                setCache(cacheKey, res.data);
            } catch (e) {
                setErr("Không thể tải danh sách bài viết.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const confirmDelete = (post) => setToDelete(post);
    const closeModal = () => setToDelete(null);

    const handleDelete = async () => {
        if (!toDelete) return;
        try {
            await client.delete(`/posts/${toDelete.id}`);
            const next = posts.filter((p) => p.id !== toDelete.id);
            setPosts(next);
            setCache(cacheKey, next);
        } catch {
            setErr("Xoá bài viết thất bại.");
        } finally {
            closeModal();
        }
    };

    if (loading) return <div className="d-flex justify-content-center"><Spinner /></div>;
    if (err) return <Alert variant="danger">{err}</Alert>;
    if (!posts || posts.length === 0) return <Alert>Không có bài viết nào!</Alert>;

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Danh sách bài viết</h3>
                <Button as={Link} to="/create">Tạo bài viết</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th style={{ width: 80 }}>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th style={{ width: 200 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.title}</td>
                            <td>{p.content}</td>
                            <td className="d-flex gap-2">
                                <Button as={Link} to={`/edit/${p.id}`} size="sm" variant="secondary">Edit</Button>
                                {/* Có route riêng /delete/:id, nhưng cũng cho phép xoá trực tiếp bằng Modal */}
                                <Button size="sm" variant="danger" onClick={() => confirmDelete(p)}>Delete</Button>
                                <Button as={Link} to={`/delete/${p.id}`} size="sm" variant="outline-danger">Delete Page</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal xác nhận xoá */}
            <Modal show={!!toDelete} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xoá bài viết: <strong>{toDelete?.title}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Huỷ</Button>
                    <Button variant="danger" onClick={handleDelete}>Xoá</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
