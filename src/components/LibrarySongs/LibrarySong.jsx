import React from "react";

const LibrarySong = ({song, setSongs, songs, setCurrentSong, audioRef, plaing}) => {

    const songClickHandler = async () => {
        await setCurrentSong(song);

        if(plaing) audioRef.current.play();

        const updateSongs = songs.map(el => {
            if(el.id === song.id) {
                return {
                    ...el,
                    active: true
                }
            } else {
                return {
                    ...el,
                    active: false
                }
            }
        })

        setSongs(updateSongs)

    }

    return (
        <div onClick={songClickHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong