import React from 'react';

export default function Filters({
  sortAsc,
  setSortAsc,
  ageRange,
  setAgeRange,
  skill,
  setSkill,
  search,
  setSearch,
  skills
}) {
  return (
    <div className="filters">
      <div className="row">
        <button onClick={() => setSortAsc((v) => !v)}>
          Sort First Name: {sortAsc ? 'A→Z' : 'Z→A'}
        </button>
        <input
          placeholder="Search full name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        <input type="number" placeholder="Min age" value={ageRange.min}
          onChange={(e) => setAgeRange({ ...ageRange, min: e.target.value })}/>
        <input type="number" placeholder="Max age" value={ageRange.max}
          onChange={(e) => setAgeRange({ ...ageRange, max: e.target.value })}/>
        <select value={skill} onChange={(e) => setSkill(e.target.value)}>
          <option value="">All skills</option>
          {skills.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}