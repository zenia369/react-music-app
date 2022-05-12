import React from "react";
import './LibrarySongs.scss';

import LibrarySong from "./LibrarySong";

const Library = ({songs, setSongs, setCurrentSong, audioRef, plaing, activeLibrary}) => {
    return (
        <div className={`library ${activeLibrary ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map((el, i) => {
                        return (
                            <LibrarySong 
                                key={el.id} 
                                song={el} 
                                setCurrentSong={setCurrentSong}
                                audioRef={audioRef}
                                plaing={plaing}
                                songs={songs}
                                setSongs={setSongs}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Library