import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default function SortDropdown({ sortOption, setSortOption }) {
  return (
    <Card className="shadow-soft w-100">
      <Card.Body>
        <Card.Title className="h6">Sorting</Card.Title>
        <Form.Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Default</option>
          <option value="ageAsc">Age ↑</option>
          <option value="ageDesc">Age ↓</option>
          <option value="nameAsc">Name A → Z</option>
          <option value="nameDesc">Name Z → A</option>
        </Form.Select>
      </Card.Body>
    </Card>
  );
}

SortDropdown.propTypes = {
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
};
