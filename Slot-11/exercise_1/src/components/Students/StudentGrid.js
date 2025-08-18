import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentCard from "./StudentCard";

export default function StudentGrid({ students }) {
  return (
    <div id="students">
      <Row className="g-3">
        {students.map((s) => (
          <Col key={s.id} xs={12} sm={6} lg={4}>
            <StudentCard student={s} />
          </Col>
        ))}
        {students.length === 0 && (
          <Col xs={12} className="text-center text-muted py-5">
            No students found.
          </Col>
        )}
      </Row>
    </div>
  );
}

StudentGrid.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
};
