import React from "react";
import Tracklist from "./Tracklist";
import './SearchResults.css';

function SearchResults({ songs, onAdd }) {
  return (
    <div className="box">
      <h1>Results</h1>
      <Tracklist tracks={songs} onAction={onAdd} actionType="Add +" />
    </div>
  );
}

export default SearchResults;