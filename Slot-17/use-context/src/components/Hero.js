import React from "react";
import SearchBar from "./SearchBar";

export default function Hero({ query, setQuery }) {
  return (
    <div className="hero" id="home">
      <div className="row align-items-center g-3">
        <div className="col-lg-7">
          <h1 className="mb-1">🍝 Food Court</h1>
          <p className="text-secondary mb-0">
            Pick your favorites, add to cart, and confirm your order in seconds.
          </p>
        </div>
        <div className="col-lg-5">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>
    </div>
  );
}
