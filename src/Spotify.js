let userId; // Cache the user ID
let accessToken;

const Spotify = {
  setAccessToken(token) {
    accessToken = token;
  },

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      accessToken = storedToken;
      return accessToken;
    }

    return null; // If no access token is available
  },

  async getCurrentUserId() {
    if (userId) {
      return Promise.resolve(userId); // Return cached userId
    }

    const accessToken = Spotify.getAccessToken();
    if (!accessToken) {
      throw new Error("Access token is required to fetch user ID.");
    }

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user ID.");
      }
      const data = await response.json();
      userId = data.id;
      return userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  },

  async getUserPlaylists() {
    const accessToken = Spotify.getAccessToken();
    if (!accessToken) {
      throw new Error("Access token is required to fetch playlists.");
    }
  
    try {
      const userId = await Spotify.getCurrentUserId();
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      //console.log("Fetched playlists data:", data); // Log full response
      if (!data.items || data.items.length === 0) {
        console.warn("No playlists found for this user.");
        return []; // Return empty array if no playlists
      }
      return data.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
      }));
    } catch (error) {
      console.error("Error fetching playlists:", error);
      throw error;
    }
  },
}; 

export default Spotify;
