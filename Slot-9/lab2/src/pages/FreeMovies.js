import { useMemo, useState } from 'react'
import { Row, Col, Toast, Alert } from 'react-bootstrap'
import HeroCarousel from '../components/HeroCarousel'
import MovieCard from '../components/MovieCard'
import SearchFilterBar from '../components/SearchFilterBar'
import { movies, allGenres } from '../data/movies'

export default function FreeMovies() {
    const [search, setSearch] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('All')
    const [sortBy, setSortBy] = useState('none')
    const [showToast, setShowToast] = useState(false)

    const processed = useMemo(() => {
        const term = search.trim().toLowerCase()
        let list = movies.filter((m) => {
            const matchesGenre = selectedGenre === 'All' || m.genre === selectedGenre
            const matchesSearch = !term ||
                m.title.toLowerCase().includes(term) ||
                m.description.toLowerCase().includes(term)
            return matchesGenre && matchesSearch
        })

        if (sortBy === 'durAsc') list = [...list].sort((a, b) => a.duration - b.duration)
        if (sortBy === 'durDesc') list = [...list].sort((a, b) => b.duration - a.duration)

        return list
    }, [search, selectedGenre, sortBy])

    return (
        <>
            <HeroCarousel />
            <SearchFilterBar
                search={search} setSearch={setSearch}
                selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}
                sortBy={sortBy} setSortBy={setSortBy}
                resultCount={processed.length}
                genres={allGenres}
            />

            {processed.length === 0 ? (
                <Alert variant="warning">No movies found.</Alert>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-3">
                    {processed.map((m) => (
                        <Col key={m.id}>
                            <MovieCard
                                movie={m}
                                onFavourited={(added) => {
                                    if (added) {
                                        setShowToast(true)
                                        setTimeout(() => setShowToast(false), 2200)
                                    }
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            <div className="toast-stack">
                <Toast bg="success" show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
                    <Toast.Header closeButton={false}><strong className="me-auto">Favourites</strong></Toast.Header>
                    <Toast.Body className="text-white">Added to favourites!</Toast.Body>
                </Toast>
            </div>
        </>
    )
}