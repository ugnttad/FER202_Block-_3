import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

export default function RecipesGrid({ recipes, onAddFavourite, favourites }) {
  return (
    <Row xs={1} sm={2} md={3} className="g-4">
      {recipes.map((r) => (
        <Col key={r.id}>
          <RecipeCard
            recipe={r}
            onAddFavourite={onAddFavourite}
            isFavourited={favourites.has(r.id)}
          />
        </Col>
      ))}
    </Row>
  );
}