import React from "react";
import './Player.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong:song, setSongs, plaing, setCurrentSong, songs, setPlaing, audioRef, continuePlay, dargHandler, songInfo}) => {

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    
    const playSongHandler = () => {
        if(plaing) {
            audioRef.current.pause();
            setPlaing(!plaing);
        } else {
            audioRef.current.play()
            setPlaing(!plaing);
        }
    }

    const getTime = (time) => {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((el) => el.id === song.id);

        if(direction === 'back') {
            if(currentIndex === 0) currentIndex = songs.length;

            currentIndex--;
        } else if(direction === 'next') {
            if(currentIndex === songs.length - 1) currentIndex = -1;

            currentIndex++;
        }

        await setCurrentSong(songs[currentIndex])

        const updateSongs = songs.map(el => {
            if(el.id === songs[currentIndex].id) {
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

        if(plaing) audioRef.current.play();

    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{songInfo.currentTime ? getTime(songInfo.currentTime) : "0:00"}</p>
                <div 
                    className="track"
                    style={{
                        'background': `linear-gradient(to right, ${song.color[0]}, ${song.color[1]})`
                    }}
                >
                    <input 
                        type="range" 
                        min={0} 
                        max={songInfo.duration || '0'}
                        value={songInfo.currentTime || '0'}
                        onChange={dargHandler}
                        onMouseUp={continuePlay}
                    />
                    <div style={trackAnim} className="animate-track"></div> 
                </div>

                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    className="skip-back" 
                    size='2x' 
                    icon={faAngleLeft} 
                    onClick={() => skipTrackHandler('back')}
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size='2x' 
                    icon={plaing ? faPause : faPlay} 
                />
                <FontAwesomeIcon 
                    className="skip-forward" 
                    size='2x' 
                    icon={faAngleRight} 
                    onClick={() => skipTrackHandler('next')}
                />
            </div>
        </div>
    )
}

export default Player