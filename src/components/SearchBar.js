import React from "react";
import "./SearchBar.css";

function SearchBar({ searchInput, setSearchInput, onSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for Songs"
        value={searchInput}
        onKeyPress={(e) => e.key === "Enter" && onSearch()}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button className="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

