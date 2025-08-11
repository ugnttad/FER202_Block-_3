// utils/counter.js

// Function that returns incrementing numbers
export const createCounter = () => {
  let count = 0;
  return () => count++;
};

// Alternative counter with custom start value
export const createCounterWithStart = (startValue = 0) => {
  let count = startValue;
  return () => count++;
};

// Counter with step increment
export const createStepCounter = (step = 1) => {
  let count = 0;
  return () => {
    const current = count;
    count += step;
    return current;
  };
};

// Reset counter
export const createResettableCounter = () => {
  let count = 0;
  
  const counter = () => count++;
  counter.reset = () => { count = 0; };
  counter.getValue = () => count;
  
  return counter;
};