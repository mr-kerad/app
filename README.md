Jammming

Jammming is a React-based web application that allows users to search for songs, create playlists, and save those playlists directly to their Spotify account. This app integrates with Spotify's Web API, providing a seamless experience for music enthusiasts to organize their favorite tracks into personalized playlists.

Features

1. Spotify Integration

Login with Spotify: Users can log in using their Spotify credentials, granting the app access to interact with their Spotify account.

Search for Songs: Use the search bar to find tracks from Spotify's extensive music library.

2. Playlist Management

Create a New Playlist: Add songs from search results to a playlist by clicking the "Add +" button.

Save Playlist to Spotify: Once your playlist is ready, save it to your Spotify account with a custom name.

3. Manage Existing Playlists

View Saved Playlists: Browse and load existing playlists from your Spotify account.

Edit Playlists: Remove tracks from a loaded playlist and save the changes back to Spotify.

Delete Playlists: Remove unwanted playlists directly from your Spotify account.

How It Works

Login: The app requires users to log in to their Spotify account. Upon logging in, an access token is obtained to interact with Spotify's Web API.

Search Songs: Enter a keyword in the search bar to retrieve song results. Each result displays the song name, artist(s), and album image.

Build a Playlist: Add desired tracks to your playlist. The app supports modifying and naming the playlist before saving.

Save or Modify Playlists: Save new playlists to Spotify or edit existing ones by removing tracks or deleting the playlist entirely.

Technologies Used

React: Front-end library for building the user interface.

Spotify Web API: Fetches song data, playlists, and enables saving playlists.

CSS: Styles the application for an intuitive and visually appealing user experience.

Setup Instructions

Clone the repository:

git clone https://github.com/your-repo/jammming.git
cd jammming

Install dependencies:

npm install

Create a .env file in the root directory with your Spotify API credentials:

REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/

Start the development server:

npm start

Open http://localhost:3000 in your web browser.

Future Enhancements

Add support for drag-and-drop functionality to reorder tracks in a playlist.

Enhance search functionality with filters for artists, albums, and genres.

Provide track previews using Spotify's audio preview feature.

License

This project is open-source and available under the MIT License.

