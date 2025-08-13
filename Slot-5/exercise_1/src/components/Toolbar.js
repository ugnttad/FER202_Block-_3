import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';

const PRESET = ["Any", 5, 10, 15, 20, 30];

export default function Toolbar({ q, setQ, maxPrep, setMaxPrep, maxCook, setMaxCook }) {
  const onSel = (setter) => (e) => setter(e.target.value === 'Any' ? '' : Number(e.target.value));
  return (
    <Row className="gy-2 align-items-center">
      <Col xs={12} md={3}>
        <Form.Select value={maxPrep === '' ? 'Any' : maxPrep} onChange={onSel(setMaxPrep)}>
          {PRESET.map((v) => <option key={`prep-${v}`} value={v}>{v === 'Any' ? 'Max Prep Time' : v + ' mins'}</option>)}
        </Form.Select>
      </Col>
      <Col xs={12} md={3}>
        <Form.Select value={maxCook === '' ? 'Any' : maxCook} onChange={onSel(setMaxCook)}>
          {PRESET.map((v) => <option key={`cook-${v}`} value={v}>{v === 'Any' ? 'Max Cook Time' : v + ' mins'}</option>)}
        </Form.Select>
      </Col>
      <Col xs={12} md>
        <InputGroup>
          <InputGroup.Text>🔎</InputGroup.Text>
          <Form.Control
            placeholder="Search by name or ingredient..."
            value={q}
            onChange={(e)=>setQ(e.target.value)}
          />
        </InputGroup>
      </Col>
    </Row>
  );
}