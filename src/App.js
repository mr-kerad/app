import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import "./App.css";

const CLIENT_ID = "a48aec817e364e14855f34983752b58d";
const CLIENT_SECRET = "7eb5bba77937493c81b486626fb1bc39";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listTitle, setListTitle] = useState(""); // State for custom list title

  useEffect(() => {
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

  const search = async () => {
    try {
      const searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

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

  const addToFavorites = (song) => {
    if (!favorites.some((fav) => fav.id === song.id)) {
      setFavorites([song, ...favorites]);
    } else {
      console.warn("Song already in favorites.");
    }
  };

  const removeFromFavorites = (trackToRemove) => {
    setFavorites(favorites.filter((track) => track.id !== trackToRemove.id));
  };

  return (
    <>
    <div>
      <header className="header">Jammming</header>
      <main className="main">
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
          />
        </div>
      </main>
    </div>
    </>
  );
}

export default App;
