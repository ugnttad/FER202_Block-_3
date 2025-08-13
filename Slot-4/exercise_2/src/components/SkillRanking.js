import React from 'react';

export default function SkillRanking({ persons }) {
  const freq = persons.reduce((acc, { skills }) => {
    skills.forEach((s) => acc.set(s, (acc.get(s) || 0) + 1));
    return acc;
  }, new Map());

  const rows = Array.from(freq.entries()).sort((a,b) => b[1]-a[1]);
  const topCount = rows[0]?.[1] ?? 0;

  return (
    <table className="table">
      <thead><tr><th>Skill</th><th>Count</th></tr></thead>
      <tbody>
        {rows.map(([skill, count]) => (
          <tr key={skill} className={count === topCount ? 'top1' : ''}>
            <td>{skill}</td>
            <td><strong>{count}</strong></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}