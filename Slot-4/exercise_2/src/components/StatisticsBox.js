import React from 'react';

export default function StatisticsBox({ persons }) {
  const stats = persons.reduce((acc, p) => {
    acc.total += 1;
    acc.ageSum += p.age;
    acc.active += p.isActive ? 1 : 0;
    return acc;
  }, { total: 0, ageSum: 0, active: 0 });
  const avg = stats.total ? (stats.ageSum / stats.total).toFixed(1) : 0;

  return (
    <div className="stats">
      <div><b>Total:</b> {stats.total}</div>
      <div><b>Avg Age:</b> {avg}</div>
      <div><b>Active:</b> {stats.active}</div>
    </div>
  );
}