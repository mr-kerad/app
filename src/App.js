import React, { useState, useEffect } from "react";
import PlaylistList from "./components/PlaylistList";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import Spotify from "./Spotify";
import "./App.css";

const CLIENT_ID = "a48aec817e364e14855f34983752b58d";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPES = [
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(" ");
const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [expiresAt, setExpiresAt] = useState(0);
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listTitle, setListTitle] = useState("My Playlist");
  const [playlists, setPlaylists] = useState([]);

  // Retrieve access token from URL hash on app load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const token = params.get("access_token");
      const expiresIn = parseInt(params.get("expires_in"), 10);
  
      if (token) {
        setAccessToken(token);
        Spotify.setAccessToken(token); // Set token in Spotify.js
        setExpiresAt(Date.now() + expiresIn * 1000);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("expiresAt", (Date.now() + expiresIn * 1000).toString());
      }
  
      window.location.hash = ""; // Clear the hash from the URL
    }
  }, []);

  // Redirect to Spotify login
  const redirectToSpotifyLogin = () => {
    window.location.href = AUTH_URL;
  };

  // Search for songs
  const search = async () => {
    if (!accessToken) {
      alert("Please log in to Spotify.");
      redirectToSpotifyLogin();
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track&market=US&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setSongs(data.tracks.items || []);
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
  };

  // Save playlist to Spotify
  const savePlaylist = async () => {
    if (!listTitle || favorites.length === 0) {
      alert("Please provide a playlist name and add songs.");
      return;
    }

    try {
      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await userResponse.json();

      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userData.id}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: listTitle,
            description: "Created with Jammming",
            public: false,
          }),
        }
      );

      const playlistData = await playlistResponse.json();

      await fetch(
        `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: favorites.map((track) => track.uri),
          }),
        }
      );

      alert("Playlist saved successfully!");
      
    // NEW: Refresh saved playlists after creating a new one
    const updatedPlaylists = await Spotify.getUserPlaylists();
    setPlaylists(updatedPlaylists); // Update state to refresh playlists
    } catch (error) {
      console.error("Error saving playlist:", error);
      alert("Failed to save the playlist. Please try again.");
    }
  };

  // Add a song to favorites
  const addToFavorites = (song) => {
    if (!favorites.find((track) => track.id === song.id)) {
      setFavorites([...favorites, song]);
    }
  };

  // Remove a song from favorites
  const removeFromFavorites = (trackToRemove) => {
    setFavorites(favorites.filter((track) => track.id !== trackToRemove.id));
  };

  return (
    <div>
      <header className="header">Jammming</header>
      <main className="main">
        {!accessToken && (
          <button className="login" onClick={redirectToSpotifyLogin}>
            Log in to Spotify
          </button>
        )}
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={search}
        />
        <div className="results-section">
          <SearchResults songs={songs} onAdd={addToFavorites} />
          <Playlist
            favorites={favorites}
            onRemove={removeFromFavorites}
            listTitle={listTitle}
            setListTitle={setListTitle}
            handleSavePlaylist={savePlaylist}
          />
          <PlaylistList playlists={playlists} setPlaylists={setPlaylists} />
        </div>
      </main>
    </div>
  );
}

export default App;
