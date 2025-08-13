import React, { useMemo, useState } from 'react';
import { persons } from './data/persons';
import { allSkills } from './data/persons';
import Filters from './components/Filters';
import { PrimaryList, FilteredSkillList } from './components/PersonList';
import SkillRanking from './components/SkillRanking';
import StatisticsBox from './components/StatisticsBox';
import './App.css';

export default function App() {
  const [sortAsc, setSortAsc] = useState(true);
  const [ageRange, setAgeRange] = useState({ min: '', max: '' });
  const [skill, setSkill] = useState('');
  const [search, setSearch] = useState('');

  // 1) Primary list + sort firstName
  const primary = useMemo(() => {
    const list = [...persons].sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      return a.firstName.localeCompare(b.firstName) * dir;
    });
    return list;
  }, [sortAsc]);

  // 2) Filter by age range & chosen skill; output FirstName – LastName – Skill
  const filteredSkill = useMemo(() => {
    const min = Number(ageRange.min);
    const max = Number(ageRange.max);

    const inAge = ({ age }) => (
      (isNaN(min) || age >= min) && (isNaN(max) || age <= max)
    );

    // flatten to entries of single skill
    return persons
      .filter(inAge)
      .reduce((arr, { firstName, lastName, skills }) => {
        skills.forEach((s) => {
          if (!skill || s === skill) arr.push({ firstName, lastName, skill: s });
        });
        return arr;
      }, []);
  }, [ageRange, skill]);

  // 4) Search by name + multi-criteria sort
  const multiSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    const byName = (p) => `${p.firstName}${p.lastName}`.toLowerCase().includes(q);
    return persons
      .filter((p) => !q || byName(p))
      .sort((a, b) => {
        // isActive true first
        if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
        // then age asc
        if (a.age !== b.age) return a.age - b.age;
        // then lastName A→Z
        return a.lastName.localeCompare(b.lastName);
      });
  }, [search]);

  return (
    <div className="container">
      <h1>Person Explorer</h1>

      <Filters
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
        skill={skill}
        setSkill={setSkill}
        search={search}
        setSearch={setSearch}
        skills={allSkills}
      />

      <section>
        <h2>1) List + Sort first name</h2>
        <PrimaryList data={primary} />
      </section>

      <section>
        <h2>2) Lọc theo độ tuổi & skill</h2>
        <FilteredSkillList data={filteredSkill} />
      </section>

      <section>
        <h2>3) Bảng xếp hạng Skill</h2>
        <SkillRanking persons={persons} />
      </section>

      <section>
        <h2>4) Tìm kiếm + Sort đa tiêu chí</h2>
        <PrimaryList data={multiSorted} />
        <StatisticsBox persons={multiSorted} />
      </section>
    </div>
  );
}