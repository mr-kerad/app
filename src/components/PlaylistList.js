import React, { useEffect } from "react";
import "./PlaylistList.css";
import Spotify from "../Spotify";

function PlaylistList({ playlists, setPlaylists, loadPlaylist }) {
  // Fetch user playlists when the component mounts
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const accessToken = Spotify.getAccessToken();
        if (!accessToken) {
          throw new Error("Access token is not set. Please log in again.");
        }
        const userPlaylists = await Spotify.getUserPlaylists();
        setPlaylists(userPlaylists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [setPlaylists]);

  // Function to remove a playlist
  const removePlaylist = async (playlistId) => {
    try {
      const accessToken = Spotify.getAccessToken();
      if (!accessToken) {
        throw new Error("Access token is not set. Please log in again.");
      }

      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        alert("Playlist removed successfully.");
        // Refresh playlists after removing one
        const updatedPlaylists = await Spotify.getUserPlaylists();
        setPlaylists(updatedPlaylists);
      } else {
        console.error("Failed to remove playlist:", await response.json());
        alert("Failed to remove the playlist. Please try again.");
      }
    } catch (error) {
      console.error("Error removing playlist:", error);
    }
  };

  return (
    <div className="box">
      <h1>Saved Playlists</h1>
      <div className="list-card">
        {playlists.map((playlist) => (
          <PlaylistListItem
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            onSelect={() => loadPlaylist(playlist.id, playlist.name)}
            onRemove={() => removePlaylist(playlist.id)} // Pass remove handler
          />
        ))}
      </div>
    </div>
  );
}

// Playlist item that includes the "Remove" button
const PlaylistListItem = ({ id, name, onSelect, onRemove }) => (
  <div className="playlist-item">
    <h2 className="saved-list" onClick={onSelect}>{name}</h2>
    <button className="button-remove" onClick={(e) => {
      e.stopPropagation(); // Prevent triggering onSelect when clicking "Remove"
      onRemove();
    }}>
      Remove -
    </button>
  </div>
);

export default PlaylistList;
