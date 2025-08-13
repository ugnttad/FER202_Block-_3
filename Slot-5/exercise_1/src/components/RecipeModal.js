import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function RecipeModal({ open, recipe, onClose, onAdd }) {
  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe?.title || 'Recipe'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-2">{recipe?.description}</p>
        {recipe && (
          <div className="small text-body-secondary">🍽️ Servings: {recipe.servings} · ⏱️ Prep: {recipe.prep} · 🍳 Cook: {recipe.cook} · ⌛ Total: {recipe.totalTime}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>Close</Button>
        <Button variant="success" onClick={() => recipe && onAdd(recipe)}>Add to Cart</Button>
      </Modal.Footer>
    </Modal>
  );
}