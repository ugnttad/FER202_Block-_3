import { Row, Col, Form, InputGroup, Badge } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function SearchFilterBar({
    search, setSearch, selectedGenre, setSelectedGenre,
    sortBy, setSortBy, resultCount, genres,
}) {
    return (
        <Row className="g-2 align-items-end mb-3">
            <Col md={6}>
                <Form.Label>Search</Form.Label>
                <InputGroup>
                    <InputGroup.Text aria-hidden>🔍</InputGroup.Text>
                    <Form.Control
                        placeholder="Search by title…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>
            </Col>
            <Col md={3}>
                <Form.Label>Genre</Form.Label>
                <Form.Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    {genres.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </Form.Select>
            </Col>
            <Col md={3}>
                <Form.Label>Sort</Form.Label>
                <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="none">None</option>
                    <option value="durAsc">Duration ↑</option>
                    <option value="durDesc">Duration ↓</option>
                </Form.Select>
            </Col>
            <Col xs={12} className="mt-2">
                <Badge bg="info" className="me-2">{resultCount}</Badge>
                results
            </Col>
        </Row>
    )
}

SearchFilterBar.propTypes = {
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
    selectedGenre: PropTypes.string.isRequired,
    setSelectedGenre: PropTypes.func.isRequired,
    sortBy: PropTypes.oneOf(['none', 'durAsc', 'durDesc']).isRequired,
    setSortBy: PropTypes.func.isRequired,
    resultCount: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}