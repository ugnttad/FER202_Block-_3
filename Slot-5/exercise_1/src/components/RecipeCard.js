import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function RecipeCard({ r, onView }) {
  return (
    <Card className="h-100 shadow-sm border-0 recipe-card">
      {r.image && <Card.Img variant="top" src={r.image} alt={r.title} onError={(e)=>{e.currentTarget.style.display='none';}} />}
      <Card.Body className="d-grid gap-2">
        <Card.Title>{r.title}</Card.Title>
        <Card.Text className="text-muted small mb-2">{r.description}</Card.Text>
        <div className="small text-body-secondary">🍽️ Servings: {r.servings} · ⏱️ Prep: {r.prep} · 🍳 Cook: {r.cook} · ⌛ Total: {r.totalTime}</div>
        <Button variant="success" className="mt-2" onClick={() => onView(r)}>View Recipe</Button>
      </Card.Body>
    </Card>
  );
}