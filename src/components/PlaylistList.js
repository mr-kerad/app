import React, { useState, useEffect } from "react";
import "./PlaylistList.css";
import Spotify from "../Spotify";

function PlaylistList({ playlists, setPlaylists }) {

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
  }, [setPlaylists]); // Run only once when component mounts


  return (
    <div className="box">
      <h1>Saved Playlists</h1>
      <div className="list-card">
        {playlists.map((playlist) => (
          <PlaylistListItem key={playlist.id} id={playlist.id} name={playlist.name} />
        ))}
      </div>
    </div>
  );
};

const PlaylistListItem = ({ id, name }) => (
  <div>
    <h2 className="saved-list">{name}</h2>
  </div>
);

export default PlaylistList;
