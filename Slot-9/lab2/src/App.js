import Container from 'react-bootstrap/Container'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import FreeMovies from './pages/FreeMovies'
import Favourites from './pages/Favourites'
import RequestForm from './pages/RequestForm'
import { FavouritesProvider } from './context/FavouritesContext'
import './App.css'

export default function App() {
  return (
    <FavouritesProvider>
      <AppNavbar />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/free" replace />} />
          <Route path="/free" element={<FreeMovies />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/request" element={<RequestForm />} />
          <Route path="*" element={<Navigate to="/free" replace />} />
        </Routes>
      </Container>
    </FavouritesProvider>
  )
}