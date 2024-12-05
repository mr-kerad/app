import React, { useState, useEffect } from "react";
import "./App.css"; // Assuming you have corresponding CSS for styling

const CLIENT_ID = "a48aec817e364e14855f34983752b58d";
const CLIENT_SECRET = "7eb5bba77937493c81b486626fb1bc39";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch access token on component mount
    const fetchToken = async () => {
      try {
        const authParameters = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            "grant_type=client_credentials&client_id=" +
            CLIENT_ID +
            "&client_secret=" +
            CLIENT_SECRET,
        };
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          authParameters
        );
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchToken();
  }, []);

  // Search for songs
  const search = async () => {
    try {
      console.log("Searching for songs with keyword: " + searchInput);

      const searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      // Fetch song data
      const songResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchInput
        )}&type=track&market=US&limit=20`,
        searchParameters
      );
      const songData = await songResponse.json();

      if (songData.tracks.items.length === 0) {
        console.warn("No songs found with the keyword: " + searchInput);
        return;
      }

      setSongs(songData.tracks.items);
    } catch (error) {
      console.error("Error during song search:", error);
    }
  };

  return (
    <div>
      <header className="header">Jammming</header>
      <main className="main">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search For Songs"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button className="search-button" onClick={search}>
            Search
          </button>
        </div>
        <div className="results-section">
          <div className="box">
            <h1>Results</h1>
            <div className="album-cards">
              {songs.map((song, index) => (
                <div className="album-card" key={index}>
                  <img
                    src={song.album.images[0]?.url || "placeholder.jpg"}
                    alt={song.name}
                    className="album-image"
                  />
                  <h2>{song.name}</h2>
                  <p>Artist: {song.artists.map((artist) => artist.name).join(", ")}</p>
                  <p>Album: {song.album.name}</p>
                  <p>Release Date: {song.album.release_date}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="box">
            <h1>My list</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
