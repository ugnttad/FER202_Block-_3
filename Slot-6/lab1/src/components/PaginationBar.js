import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function PaginationBar({ current, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const go = (p) => () => onChange(p);

  const items = [];
  for (let p = 1; p <= totalPages; p++) {
    items.push(
      <Pagination.Item key={p} active={p === current} onClick={go(p)}>
        {p}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.First onClick={go(1)} disabled={current === 1} />
      <Pagination.Prev onClick={go(Math.max(1, current - 1))} disabled={current === 1} />
      {items}
      <Pagination.Next onClick={go(Math.min(totalPages, current + 1))} disabled={current === totalPages} />
      <Pagination.Last onClick={go(totalPages)} disabled={current === totalPages} />
    </Pagination>
  );
}