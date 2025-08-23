import React, { useContext, useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductCard from "./ProductCard";
import HeroCarousel from "../components/HeroCarousel";
import { CartContext } from "../contexts/CartContext";

const toNumber = (v) => {
  if (v == null) return 0;
  if (typeof v === "number") return v;
  return Number(String(v).replace(/[^\d]/g, "")) || 0;
};
const getPrice = (p) => toNumber(p.currentPrice ?? p.salePrice ?? p.price ?? p.newPrice ?? 0);

export default function Products() {
  const [foods, setFoods] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useContext(CartContext); // để đảm bảo dùng context từ nhiều nơi

  useEffect(() => {
    fetch("http://localhost:3001/foods")
      .then((r) => r.json())
      .then((d) => setFoods(Array.isArray(d) ? d : []))
      .catch(() => setFoods([]));
  }, []);

  const visible = useMemo(() => {
    let list = [...foods];

    // search theo tên/mô tả
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter(
        (f) =>
          (f.name && f.name.toLowerCase().includes(t)) ||
          (f.description && f.description.toLowerCase().includes(t))
      );
    }

    // filter khoảng giá (min/max)
    const min = toNumber(minPrice);
    const max = toNumber(maxPrice);
    if (min || max) {
      list = list.filter((f) => {
        const p = getPrice(f);
        if (min && p < min) return false;
        if (max && p > max) return false;
        return true;
      });
    }

    // sort
    const [k, dir] = sort.split("-");
    list.sort((a, b) => {
      if (k === "price") {
        const pa = getPrice(a), pb = getPrice(b);
        return dir === "asc" ? pa - pb : pb - pa;
      }
      const an = (a.name || "").toLowerCase();
      const bn = (b.name || "").toLowerCase();
      return dir === "asc" ? an.localeCompare(bn) : bn.localeCompare(an);
    });

    return list;
  }, [foods, q, sort, minPrice, maxPrice]);

  return (
    <Container className="my-4">
      <HeroCarousel autoplay />
      <div className="d-flex gap-2 flex-wrap justify-content-between mb-4">
        <Form.Control
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ maxWidth: 320 }}
        />
        <div className="d-flex gap-2 align-items-center flex-wrap">
          <Form.Control
            type="number"
            min={0}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min ₫"
            style={{ width: 130 }}
          />
          <Form.Control
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max ₫"
            style={{ width: 130 }}
          />
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name-asc">Name ↑</option>
            <option value="name-desc">Name ↓</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </Form.Select>
        </div>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {visible.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
