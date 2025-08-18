import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Ratio from "react-bootstrap/Ratio";
import StudentDetailModal from "./StudentDetailModal";

export default function StudentCard({ student }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card className="h-100 shadow-soft overflow-hidden">
                {/* Ảnh luôn cùng tỉ lệ 16:9, fill khung, không méo */}
                <Ratio aspectRatio="16x9" className="bg-light">
                    {student.avatar ? (
                        <img
                            src={student.avatar}
                            alt={student.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",      // đổi sang "contain" nếu muốn không cắt ảnh
                                objectPosition: "center",
                                display: "block"
                            }}
                        />
                    ) : (
                        <div
                            className="w-100 h-100 d-flex align-items-center justify-content-center text-muted"
                            style={{ fontSize: 12 }}
                        >
                            No avatar
                        </div>
                    )}
                </Ratio>

                <Card.Body>
                    <Card.Title className="h6 mb-2">{student.name}</Card.Title>
                    <div className="small text-muted mb-2">ID: {student.id}</div>
                    <div className="small">{student.email}</div>
                    <div className="small">
                        Age: <strong>{student.age}</strong>
                    </div>
                </Card.Body>

                <Card.Footer className="bg-white border-0 pt-0">
                    <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
                        View Details
                    </Button>
                </Card.Footer>
            </Card>

            {open && (
                <StudentDetailModal student={student} onClose={() => setOpen(false)} />
            )}
        </>
    );
}

StudentCard.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        avatar: PropTypes.string,
    }).isRequired,
};
