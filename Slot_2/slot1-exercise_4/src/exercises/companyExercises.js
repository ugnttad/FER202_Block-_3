// exercises/companyExercises.js
import { companies } from '../data/Companies';

console.log("=== Companies Exercises ===");

// Print the name of each company using forEach
console.log("Company names:");
companies.forEach(company => console.log(company.name));

// Print companies that started after 1987
console.log("\nCompanies started after 1987:");
companies
  .filter(company => company.start > 1987)
  .forEach(company => console.log(company.name));

// Get retail companies, increment start by 1, and create DOM elements
console.log("\nRetail companies with incremented start year:");
const retailCompanies = companies
  .filter(company => company.category === "Retail")
  .map(company => ({ ...company, start: company.start + 1 }));

retailCompanies.forEach(company => {
  console.log(`${company.name} - ${company.category} - ${company.start} - ${company.end}`);
  
  // Create DOM elements (if running in browser)
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>Name: ${company.name}</p>
      <p>Category: ${company.category}</p>
      <p>Start: ${company.start}</p>
      <p>End: ${company.end}</p>
    `;
    div.style.border = '1px solid #ccc';
    div.style.padding = '10px';
    div.style.margin = '10px';
    div.style.backgroundColor = '#f9f9f9';
    document.body.appendChild(div);
  }
});

// Sort companies by end date in ascending order
const companiesSortedByEnd = [...companies].sort((a, b) => a.end - b.end);
console.log("\nCompanies sorted by end date:", 
  companiesSortedByEnd.map(c => `${c.name} (${c.end})`));

// Export functions for potential reuse
export const getRetailCompanies = () => {
  return companies.filter(company => company.category === "Retail");
};

export const sortCompaniesByEnd = () => {
  return [...companies].sort((a, b) => a.end - b.end);
};

export const getCompaniesAfterYear = (year) => {
  return companies.filter(company => company.start > year);
};