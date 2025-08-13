import React, { useMemo, useState } from 'react';
import { recipes } from './data/recipes';
import Toolbar from './components/Toolbar';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './App.css';

export default function App(){
  const [q, setQ] = useState('');
  const [maxPrep, setMaxPrep] = useState('');
  const [maxCook, setMaxCook] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);

  const list = useMemo(() => {
    return recipes.filter((r) => {
      const textOk = !q || r.title.toLowerCase().includes(q.toLowerCase()) || r.description.toLowerCase().includes(q.toLowerCase());
      const prepOk = maxPrep === '' || r.prep <= Number(maxPrep);
      const cookOk = maxCook === '' || r.cook <= Number(maxCook);
      return textOk && prepOk && cookOk;
    });
  }, [q, maxPrep, maxCook]);

  const onView = (r) => { setSelected(r); setOpen(true); };
  const onClose = () => setOpen(false);
  const onAdd = (r) => setCart((c) => [...c, r]);

  return (
    <>
      <Navbar bg="light" expand="md" className="border-bottom">
        <Container>
          <Navbar.Brand>Healthy Recipe Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link active>Recipes</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <header className="hero text-center">
          <h1 className="display-5 fw-semibold mb-2">Explore our simple, healthy recipes</h1>
          <p className="lead text-body-secondary">Discover quick, whole‑food dishes that fit real‑life schedules and taste amazing.</p>
        </header>

        <Toolbar q={q} setQ={setQ} maxPrep={maxPrep} setMaxPrep={setMaxPrep} maxCook={maxCook} setMaxCook={setMaxCook} />

        <div className="mt-3">
          <RecipeList list={list} onView={onView} />
        </div>

        <div className="text-end small text-body-secondary mt-3">Cart: {cart.length} item(s)</div>
      </Container>

      <RecipeModal open={open} recipe={selected} onClose={onClose} onAdd={onAdd} />
    </>
  );
}