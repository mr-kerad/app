import React from "react";
import './Track.css';

function Track({ track, onAction, actionType }) {
  return (
    <div className="album-card">
      <img
        src={track.album.images[0]?.url || "placeholder.jpg"}
        alt={track.name}
        className="album-image"
      />
      <div>
        <h2>Song name: {track.name}</h2>
        <p>Artist: {track.artists.map((artist) => artist.name).join(", ")}</p>
      </div>
      <button
        className={actionType === "Add +" ? "button-favorite" : "button-remove"}
        onClick={() => onAction(track)}
      >
        {actionType}
      </button>
    </div>
  );
}

export default Track;