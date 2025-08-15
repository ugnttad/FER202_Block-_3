import { Card, Badge, Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useFavourites } from '../context/FavouritesContext'

export default function MovieCard({ movie, onFavourited }) {
    const { favourites, toggleFavourite } = useFavourites()
    const isFav = favourites.includes(movie.id)
    const [showModal, setShowModal] = useState(false)

    const handleFav = () => {
        const added = toggleFavourite(movie.id)
        onFavourited?.(added)
    }

    return (
        <>
            <Card className="h-100 shadow-sm movie-card">
                <div className="ratio ratio-2x3">
                    <img src={movie.poster} alt={`${movie.title} poster`} className="card-img-top object-fit-cover" />
                </div>
                <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-start justify-content-between gap-2 mb-1">
                        <Card.Title className="mb-0 fs-6">{movie.title}</Card.Title>
                        <Badge bg="secondary">{movie.genre}</Badge>
                    </div>
                    <Card.Subtitle className="text-muted mb-2">
                        {movie.year} · {movie.country} · {movie.duration}m
                    </Card.Subtitle>
                    <Card.Text className="text-truncate-3">
                        {movie.description}
                    </Card.Text>
                    <div className="mt-auto d-flex gap-2">
                        <Button variant={isFav ? 'outline-danger' : 'primary'} onClick={handleFav}>
                            {isFav ? 'Remove from Favourites' : 'Add to Favourites'}
                        </Button>
                        <Button variant="secondary" onClick={() => setShowModal(true)}>Details</Button>
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{movie.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><Badge bg="secondary" className="me-2">{movie.genre}</Badge> {movie.year} · {movie.country} · {movie.duration} minutes</p>
                    <p>{movie.description}</p>
                    <hr />
                    <h6 className="mb-2">Showtimes</h6>
                    <ul className="mb-0">
                        <li>Today 19:00</li>
                        <li>Tomorrow 21:00</li>
                        <li>Saturday 16:30</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        country: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
    }).isRequired,
    onFavourited: PropTypes.func,
}