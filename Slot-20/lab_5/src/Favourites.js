// src/Favourites.js
import React, { useContext } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { FavouritesContext } from "./contexts/FavouritesContext"; // ./ thay vì ../
import ProductCard from "./pages/ProductCard";                    // ./ thay vì ../

export default function Favourites() {
    const { favs } = useContext(FavouritesContext);
    return (
        <Container className="my-4">
            <h3 className="text-success mb-3">My Favourites</h3>
            {favs?.length ? (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {favs.map(p => (<Col key={p.id}><ProductCard product={p} /></Col>))}
                </Row>
            ) : (
                <Alert variant="secondary">Danh sách yêu thích trống</Alert>
            )}
        </Container>
    );
}
