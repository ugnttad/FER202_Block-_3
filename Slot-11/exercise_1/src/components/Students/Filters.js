import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Filters({
  filterSearch, setFilterSearch,
  ageFilter, setAgeFilter,
  hasAvatar, setHasAvatar,
}) {
  return (
    <Card className="shadow-soft w-100">
      <Card.Body>
        <Card.Title className="h6">Filters</Card.Title>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="filterSearch">
              <Form.Label>Search (name/email)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. An, fpt.edu.vn"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="ageRange">
              <Form.Label>Age range</Form.Label>
              <Form.Select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="≤20">≤ 20</option>
                <option value="21-25">21 – 25</option>
                <option value=">25">&gt; 25</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2} className="d-flex align-items-end">
            <Form.Check
              id="hasAvatar"
              type="checkbox"
              label="Has avatar"
              checked={hasAvatar}
              onChange={(e) => setHasAvatar(e.target.checked)}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

Filters.propTypes = {
  filterSearch: PropTypes.string.isRequired,
  setFilterSearch: PropTypes.func.isRequired,
  ageFilter: PropTypes.string.isRequired,
  setAgeFilter: PropTypes.func.isRequired,
  hasAvatar: PropTypes.bool.isRequired,
  setHasAvatar: PropTypes.func.isRequired,
};
