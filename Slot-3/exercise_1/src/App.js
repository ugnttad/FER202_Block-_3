import React, { useMemo, useState } from "react";
import { companies, categories } from "./data/companies";
import Controls from "./components/Control";
import CompanyTable from "./components/CompanyTable";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); // commit search by button
  const [sortMode, setSortMode] = useState("asc");
  const [category, setCategory] = useState("All");
  const [range, setRange] = useState({ start: "", end: "" });

  const filtered = useMemo(() => {
    let data = companies;

    if (category !== "All") data = data.filter((c) => c.category === category);

    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter((c) => c.name.toLowerCase().includes(q));
    }

    if (sortMode === "asc") {
      data = [...data].sort((a, b) => a.start - b.start);
    } else if (sortMode === "desc") {
      data = [...data].sort((a, b) => b.start - a.start);
    } else if (sortMode === "range") {
      const s = Number(range.start);
      const e = Number(range.end);
      data = data.filter((c) => (!isNaN(s) ? c.start >= s : true) && (!isNaN(e) ? c.end <= e : true));
    }

    return data;
  }, [query, category, sortMode, range]);

  const onSearch = () => setQuery(search);

  return (
    <div className="container">
      <h1>Company Browser</h1>
      <Controls
        search={search}
        setSearch={setSearch}
        onSearch={onSearch}
        sortMode={sortMode}
        setSortMode={setSortMode}
        category={category}
        setCategory={setCategory}
        range={range}
        setRange={setRange}
      />

      {/* inject category options */}
      <style>{`
        .controls select:nth-of-type(2) { display:none; }
      `}</style>

      {/* Workaround: render category select options in place */}
      <script>{/* no-op */}</script>

      <div style={{ display: "none" }}>{/* placeholder */}</div>

      {/* Render bảng */}
      <CompanyTable list={filtered} />

      {/* Render Category select options via portal-like simple injection */}
      <CategoryOptions categories={categories} />
    </div>
  );
}

function CategoryOptions({ categories }) {
  // Simple util to inject options into the second select in Controls
  React.useEffect(() => {
    const selects = document.querySelectorAll(".controls select");
    const categorySelect = selects[1];
    if (!categorySelect || categorySelect.options.length) return;
    categories.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categorySelect.appendChild(opt);
    });
  }, [categories]);
  return null;
}