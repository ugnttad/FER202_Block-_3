import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

export default function RecipeCard({ recipe, onAddFavourite, isFavourited, onViewDetails }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={recipe.image} alt={recipe.name} className="card-img-top" />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">{recipe.name}</Card.Title>
        <Card.Text className="text-muted mb-3">
          Prep: {recipe.prepTime}′ · Cook: {recipe.cookTime}′
        </Card.Text>
        <Card.Text className="flex-grow-1">{recipe.description}</Card.Text>

        
        <div className="d-flex gap-2 mt-2">
          <Button
            variant={isFavourited ? 'outline-danger' : 'danger'}
            onClick={() => onAddFavourite?.(recipe)}
          >
            {isFavourited ? <BsHeartFill className="me-2" /> : <BsHeart className="me-2" />}
            Add to Favourite
          </Button>

          <Button
            variant="outline-primary"
            onClick={() => onViewDetails?.(recipe)}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
