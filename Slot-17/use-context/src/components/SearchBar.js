import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <form>
      <div className="input-group">
        <span className="input-group-text">🔎</span>
        <input
          type="text"
          className="form-control"
          placeholder="Search dishes by name or description..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </form>
  );
}
