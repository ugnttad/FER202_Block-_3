import { companies, person } from '../data/Companies';
import { parseQueryParams } from '../utils/urlParser';
import { createCounter } from '../utils/counter';

console.log("=== ES6 Features Exercises ===");

// Object destructuring and ES6 features
const { name, category } = companies[0];
const companyObject = {
  name,
  category,
  print() {
    console.log(`Company name: ${this.name}`);
  }
};
console.log("Destructured company object:");
companyObject.print();

// Function that takes unknown number of arguments and returns sum
const sumNumbers = (...numbers) => {
  return numbers.reduce((sum, num) => sum + num, 0);
};
console.log("Sum of multiple numbers (1,2,3,4,5):", sumNumbers(1, 2, 3, 4, 5));

// Function that takes unknown arguments and adds to array
const collectArguments = (...args) => {
  const result = [];
  args.forEach(arg => {
    if (Array.isArray(arg)) {
      result.push(...arg);
    } else {
      result.push(arg);
    }
  });
  return result;
};
console.log("Collected arguments:", collectArguments(1, [2, 3], 4, [5, 6], 7));

// Destructuring street from person object
const { address: { street } } = person;
console.log("Destructured street:", street);

// Test counter function
const counter = createCounter();
console.log("Counter calls:", counter(), counter(), counter(), counter());

// Test URL parser
const exampleUrl = "https://example.com?name=John&age=30&city=NewYork";
console.log("Parsed query parameters:", parseQueryParams(exampleUrl));

// Template literals example
const userName = "Developer";
const userAge = 25;
const greeting = `Hello ${userName}, you are ${userAge} years old!`;
console.log("Template literal:", greeting);

// Default parameters
const greetUser = (name = "Guest", greeting = "Hello") => {
  return `${greeting}, ${name}!`;
};
console.log("Default parameters:", greetUser());
console.log("With parameters:", greetUser("Alice", "Hi"));

// Export useful functions
export { 
  sumNumbers, 
  collectArguments, 
  companyObject,
  greetUser
};