import { people, ages } from '../data/People';

console.log("=== People Array Exercises ===");

// Defensive checks for people array
if (Array.isArray(people)) {
    // Find the first person who is a teenager (age >= 10 and age <= 20)
    const firstTeenager = people.find(person => person.age >= 10 && person.age <= 20);
    console.log("First teenager:", firstTeenager);

    // Find all teenagers
    const allTeenagers = people.filter(person => person.age >= 10 && person.age <= 20);
    console.log("All teenagers:", allTeenagers);

    // Check if every person is a teenager
    const everyPersonIsTeenager = people.every(person => person.age >= 10 && person.age <= 20);
    console.log("Every person is teenager:", everyPersonIsTeenager);

    // Check if any person is a teenager
    const anyPersonIsTeenager = people.some(person => person.age >= 10 && person.age <= 20);
    console.log("Any person is teenager:", anyPersonIsTeenager);
} else {
    console.error("Error: 'people' is not an array or is undefined.");
}

// Array reduce exercises
const array = [1, 2, 3, 4];

console.log("\n=== Array Reduce Exercises ===");

// Using reduce to sum all elements
const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Sum using reduce:", sum);

// Using reduce to find product
const product = array.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
console.log("Product using reduce:", product);

// Arrow function examples for simple operations
const simpleSum = (a, b) => a + b;
const simpleProduct = (a, b) => a * b;
const square = x => x * x;
const double = x => x * 2;

console.log("Arrow function sum (5, 3):", simpleSum(5, 3));
console.log("Arrow function product (4, 6):", simpleProduct(4, 6));
console.log("Square of 7:", square(7));
console.log("Double of 15:", double(15));

// Defensive checks for ages array
if (Array.isArray(ages)) {
    // Sum of all ages using reduce
    const agesSum = ages.reduce((sum, age) => sum + age, 0);
    console.log("Sum of all ages:", agesSum);

    // Sort ages in descending order
    const agesSortedDesc = [...ages].sort((a, b) => b - a);
    console.log("Ages sorted descending:", agesSortedDesc);
} else {
    console.error("Error: 'ages' is not an array or is undefined.");
}