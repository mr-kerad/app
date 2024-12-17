import React from "react";

const PlaylistListItem = ({ id, name }) => (
  <div key={id}>
    <p>{name}</p>
  </div>
);

export default PlaylistListItem;
