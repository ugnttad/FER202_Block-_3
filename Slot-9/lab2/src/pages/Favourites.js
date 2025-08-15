import { Row, Col, Alert } from 'react-bootstrap'
import MovieCard from '../components/MovieCard'
import { movies } from '../data/movies'
import { useFavourites } from '../context/FavouritesContext'

export default function Favourites() {
    const { favourites } = useFavourites()
    const favMovies = movies.filter((m) => favourites.includes(m.id))

    if (favMovies.length === 0) {
        return <Alert variant="info">No favourites yet.</Alert>
    }

    return (
        <>
            <h4 className="mb-3">My Favourite Movies</h4>
            <Row xs={1} md={2} lg={3} className="g-3">
                {favMovies.map((m) => (
                    <Col key={m.id}>
                        <MovieCard movie={m} />
                    </Col>
                ))}
            </Row>
        </>
    )
}