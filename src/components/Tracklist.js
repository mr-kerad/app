import React from "react";
import Track from "./Track";
import './Tracklist.css';

function Tracklist({ tracks, onAction, actionType }) {
  return (
    <div className="album-cards">
      {tracks.map((track) => (
        <Track key={track.id} track={track} onAction={onAction} actionType={actionType} />
      ))}
    </div>
  );
}

export default Tracklist;