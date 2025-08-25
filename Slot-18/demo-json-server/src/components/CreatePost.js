import React, { useState } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import { Alert } from "react-bootstrap";

export default function CreatePost() {
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (payload) => {
        try {
            await client.post("/posts", payload);
            setStatus("Tạo bài viết thành công!");
            navigate("/posts");
        } catch {
            setStatus("Có lỗi xảy ra khi tạo bài viết.");
        }
    };

    return (
        <div>
            <h3>Thêm bài viết mới</h3>
            {status && <Alert className="mt-2">{status}</Alert>}
            <PostForm onSubmit={onSubmit} submitText="Tạo bài viết" />
        </div>
    );
}
