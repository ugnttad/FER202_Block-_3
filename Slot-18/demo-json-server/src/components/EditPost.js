import React, { useEffect, useState } from "react";
import client from "../api/client";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "./PostForm";
import { Alert, Spinner } from "react-bootstrap";

export default function EditPost() {
    const { id } = useParams();
    const idNum = Number(id); // Ép sang số để chắc chắn /posts/:id là numeric
    const [post, setPost] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await client.get(`/posts/${idNum}`);
                if (res?.data && res.data.id != null) {
                    setPost(res.data);
                } else {
                    setPost(null);
                    setStatus("Không tìm thấy bài viết.");
                }
            } catch {
                setPost(null);
                setStatus("Không tìm thấy bài viết.");
            } finally {
                setLoading(false);
            }
        })();
    }, [idNum]);

    const onSubmit = async (payload) => {
        try {
            // Dùng PATCH để tránh ghi đè toàn bộ object và làm mất id
            await client.patch(`/posts/${idNum}`, payload);
            setStatus("Cập nhật thành công!");
            navigate("/posts");
        } catch {
            setStatus("Có lỗi xảy ra khi cập nhật.");
        }
    };

    if (loading) return <Spinner />;
    if (!post) return <Alert variant="danger">{status || "Bài viết không tồn tại."}</Alert>;

    return (
        <div>
            <h3>Chỉnh sửa bài viết</h3>
            {status && <Alert className="mt-2">{status}</Alert>}
            <PostForm initialPost={post} onSubmit={onSubmit} submitText="Cập nhật bài viết" />
        </div>
    );
}
