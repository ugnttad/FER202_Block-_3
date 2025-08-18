import React, { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "./Navbar";
import Filters from "./Filters";
import SortDropdown from "./SortDropdown";
import StudentGrid from "./StudentGrid";
import Footer from "./Footer";
import { students } from "../../students";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const filteredStudents = useMemo(() => {
    let data = [...students];

    const byText = (s, q) =>
      s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((s) => byText(s, q));
    }
    if (filterSearch.trim()) {
      const q2 = filterSearch.toLowerCase();
      data = data.filter((s) => byText(s, q2));
    }

    if (ageFilter === "≤20") data = data.filter((s) => s.age <= 20);
    if (ageFilter === "21-25") data = data.filter((s) => s.age >= 21 && s.age <= 25);
    if (ageFilter === ">25") data = data.filter((s) => s.age > 25);

    if (hasAvatar) data = data.filter((s) => s.avatar && s.avatar.trim() !== "");

    if (sortOption === "ageAsc") data.sort((a, b) => a.age - b.age);
    if (sortOption === "ageDesc") data.sort((a, b) => b.age - a.age);
    if (sortOption === "nameAsc") data.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOption === "nameDesc") data.sort((a, b) => b.name.localeCompare(a.name));

    return data;
  }, [search, filterSearch, ageFilter, hasAvatar, sortOption]);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <div className="py-4">
        <Container>
          <Row className="mb-3">
            <Col>
              <div className="px-3 py-4 bg-white border rounded-3 shadow-soft">
                <h2 className="h4 mb-1">Student Management</h2>
                <p className="text-muted mb-0">
                  Manage and view students efficiently
                </p>
              </div>
            </Col>
          </Row>

          <Row className="g-3 align-items-stretch mb-3">
            <Col lg={8}><Filters
              filterSearch={filterSearch}
              setFilterSearch={setFilterSearch}
              ageFilter={ageFilter}
              setAgeFilter={setAgeFilter}
              hasAvatar={hasAvatar}
              setHasAvatar={setHasAvatar}
            /></Col>
            <Col lg={4}><SortDropdown sortOption={sortOption} setSortOption={setSortOption} /></Col>
          </Row>

          <StudentGrid students={filteredStudents} />
        </Container>
      </div>
      <Footer />
    </>
  );
}
