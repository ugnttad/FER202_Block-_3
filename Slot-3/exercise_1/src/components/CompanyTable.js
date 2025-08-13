import React from "react";

export default function CompanyTable({ list }) {
  if (!list.length) return <div className="empty">No result</div>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Start</th>
          <th>End</th>
          <th>Years</th>
        </tr>
      </thead>
      <tbody>
        {list.map((c) => (
          <tr key={c.name}>
            <td>{c.name}</td>
            <td>{c.category}</td>
            <td>{c.start}</td>
            <td>{c.end}</td>
            <td>{c.end - c.start}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}