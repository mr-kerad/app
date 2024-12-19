import React from "react";
import Tracklist from "./Tracklist";
import "./Playlist.css";

function Playlist({ favorites, onRemove, listTitle, setListTitle, handleSavePlaylist,
  selectedPlaylistTracks = [],
  selectedPlaylistName = "", }) {
  return (
    <div className="box">
      <h1>
        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          className="title-input-inline"
        />
      </h1>
      <Tracklist tracks={favorites} onAction={onRemove} actionType="Remove -" />
      <div className="button-container">
        <button className="button-spotify" onClick={handleSavePlaylist}>Save to Spotify</button>
      </div>
    </div>
  );
}

export default Playlist;