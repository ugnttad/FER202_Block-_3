import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Dropdown, DropdownButton, Toast, ToastContainer, ButtonGroup } from 'react-bootstrap';
import NavbarHeader from './components/NavbarHeader';
import CarouselHero from './components/CarouselHero';
import RecipesGrid from './components/RecipesGrid';
import RequestFormModal from './components/RequestFormModal';
import PaginationBar from './components/PaginationBar';
import { recipes as DATA } from './data/recipes';
import './App.css';

const SORTS = {
  NAME_ASC: { label: 'Name A→Z' },
  NAME_DESC: { label: 'Name Z→A' },
  PREP_ASC: { label: 'Prep ↑' },
  PREP_DESC: { label: 'Prep ↓' },
  COOK_ASC: { label: 'Cook ↑' },
  COOK_DESC: { label: 'Cook ↓' }
};

export default function App() {
  // Favourites
  const [favourites, setFavourites] = useState(new Set());
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Sorting & Pagination
  const [sortKey, setSortKey] = useState('NAME_ASC');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [page, setPage] = useState(1);

  // Modal Form
  const [showForm, setShowForm] = useState(false);

  const sorted = useMemo(() => {
    const arr = [...DATA];
    arr.sort((a, b) => {
      switch (sortKey) {
        case 'NAME_ASC': return a.name.localeCompare(b.name);
        case 'NAME_DESC': return b.name.localeCompare(a.name);
        case 'PREP_ASC': return a.prepTime - b.prepTime;
        case 'PREP_DESC': return b.prepTime - a.prepTime;
        case 'COOK_ASC': return a.cookTime - b.cookTime;
        case 'COOK_DESC': return b.cookTime - a.cookTime;
        default: return 0;
      }
    });
    return arr;
  }, [sortKey]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const pageClamped = Math.min(page, totalPages);
  const start = (pageClamped - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = sorted.slice(start, end);

  const handleSelectSort = (key) => {
    setSortKey(key);
    setPage(1);
  };

  const handleSelectPerPage = (num) => {
    setItemsPerPage(Number(num));
    setPage(1);
  };

  const handleAddFavourite = (recipe) => {
    setFavourites(prev => {
      const next = new Set(prev);
      next.add(recipe.id);
      return next;
    });
    setToastMsg(`Added to favourites: ${recipe.name}`);
    setShowToast(true);
  };

  return (
    <>
      <NavbarHeader
        favouriteCount={favourites.size}
        onShowRequestForm={() => setShowForm(true)}
      />

      <Container>
        {/* Carousel */}
        <CarouselHero />

        {/* Controls: Sort + Items per page */}
        <Row className="align-items-center controls-bar py-2 border rounded mb-3 g-2">
          <Col xs="12" md="4">
            <strong id="recipes">Sort by:</strong>{' '}
            <DropdownButton as={ButtonGroup} title={SORTS[sortKey].label} size="sm" className="d-inline-block ms-2" variant="outline-secondary">
              {Object.entries(SORTS).map(([key, val]) => (
                <Dropdown.Item key={key} active={sortKey === key} onClick={() => handleSelectSort(key)}>
                  {val.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col xs="12" md="4" className="text-md-center">
            <span className="text-muted">Hiển thị theo tiêu chí đã chọn</span>
          </Col>
          <Col xs="12" md="4" className="text-md-end">
            <strong>Items per page:</strong>{' '}
            <DropdownButton title={String(itemsPerPage)} size="sm" className="d-inline-block ms-2" variant="outline-secondary">
              {[6, 9, 12].map(n => (
                <Dropdown.Item key={n} active={itemsPerPage === n} onClick={() => handleSelectPerPage(n)}>
                  {n}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>

        {/* Grid */}
        <RecipesGrid recipes={pageItems} onAddFavourite={handleAddFavourite} favourites={favourites} />

        {/* Pagination */}
        <PaginationBar current={pageClamped} totalPages={totalPages} onChange={setPage} />
      </Container>

      {/* Toast (auto-hide 5s) */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="light" onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{toastMsg || 'Added to favourites'}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal Form */}
      <RequestFormModal show={showForm} onHide={() => setShowForm(false)} />
    </>
  );
}