import React from 'react';

export function PrimaryList({ data }) {
  return (
    <ul className="list">
      {data.map(p => (
        <li key={p.id}>
          <div className="title">{p.fullName}</div>
          <div className="sub">Age: {p.age} — City: {p.city} — Skills: {p.skills.join(', ')}</div>
        </li>
      ))}
    </ul>
  );
}

export function FilteredSkillList({ data }) {
  if (!data.length) return <div className="empty">No found.</div>;
  return (
    <ul className="list">
      {data.map(({ firstName, lastName, skill }, idx) => (
        <li key={`${firstName}-${lastName}-${skill}-${idx}`}>
          {firstName} – {lastName} – {skill}
        </li>
      ))}
    </ul>
  );
}