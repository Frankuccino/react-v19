import { use } from "react";

const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
};

// Create a promise once outside the component
const todoPromise = fetchData();

const FetchTodoNew = () => {
  const data = use(todoPromise);

  return (
    <div>
      <h2>{data.title}</h2>
    </div>
  );
};

export default FetchTodoNew;
// Referential Stability -> This is the most important React term for this concept. When an object, array, or function keeps the exact same memory address across multiple renders, it is said to have referential stability.
// The promise outside the component was referentially stable, if inside the component, the promise lacked referential stability (it change every render).

// Referential Equality / Reference Identity (JS) -> This is the underlying JS rule. JS has two types of equality (checking strings or numbers are the same) and referential equality (checking if two objects point to the same location in memory)
// -> because use() uses strict reference checking (===) it fails referential equality is broken

// Idempotence / Idempotent Function -> An idempotent function that can be called multiple times but will always produce the exact same result without unintended side effects. The fetchData function is not naturally idempotent because calling it twice creates two different network request and two different promises. Moving it ourtside or wrapping it in a cache makes the data resolution process idempotentsws

// Pure vs Impure Components -> React components are supposed to be pure functions regarding their execution environment. A pure function should only calculate the UI based on props and state; it shouldn't kick off untracked side effects (like initiating a network request) directly in its main body. Kicking off a fetch inside the component body violates this purity.

// Summary for the use() hook
// The use() hook requires a referentially stable promise. Because the fetch function was called inside the component body, it broke referential equality on every render, leading to an infinite suspension loop.
