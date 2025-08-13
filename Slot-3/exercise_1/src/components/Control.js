import React from "react";

export default function Controls({
  search,
  setSearch,
  onSearch,
  sortMode,
  setSortMode,
  category,
  setCategory,
  range,
  setRange
}) {
  const showRange = sortMode === "range";

  return (
    <div className="controls">
      <div className="row">
        <input
          placeholder="Tìm theo tên công ty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={onSearch}>Tìm kiếm</button>
      </div>

      <div className="row">
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
          <option value="asc">Năm tăng dần (start)</option>
          <option value="desc">Năm giảm dần (start)</option>
          <option value="range">Chọn từ start–end</option>
        </select>

        {showRange && (
          <>
            <input
              type="number"
              placeholder="Start"
              value={range.start}
              onChange={(e) => setRange({ ...range, start: e.target.value })}
            />
            <input
              type="number"
              placeholder="End"
              value={range.end}
              onChange={(e) => setRange({ ...range, end: e.target.value })}
            />
          </>
        )}

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {/* options inject ở App */}
        </select>
      </div>
    </div>
  );
}