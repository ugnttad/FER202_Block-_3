import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

export default function RecipeList({ list, onView }) {
  if (!list.length) return <div className="text-center text-muted py-4">No recipes</div>;
  return (
    <Row xs={1} sm={2} md={3} className="g-4">
      {list.map((r) => (
        <Col key={r.title}>
          <RecipeCard r={r} onView={onView} />
        </Col>
      ))}
    </Row>
  );
}