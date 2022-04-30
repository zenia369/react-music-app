import React from "react";
import './Song.scss';


const Song = ({currentSong:song}) => {

    return (
        <div className="song-container">
            <img src={song.cover} alt={`Song ${song.name}`} />
            <h1>{song.name}</h1>
            <h3>{song.artist}</h3>
        </div>
    )
}

export default Song