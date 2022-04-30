import React, {useRef, useState} from "react";
import './Player.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong:song, plaing, setPlaing}) => {
    const [songInfo, setSongInfo] = useState({
        currentTime: null,
        duration: null,
    });
    const audioRef = useRef();
    
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

    const dargHandler = (e) => {
        const value = e.target.value;

        audioRef.current.pause();
        setPlaing(false);
        audioRef.current.currentTime = value;

        setSongInfo({
            ...songInfo,
            currentTime: value
        });
    }

    const continuePlay = () => {
        audioRef.current.play();
        setPlaing(true);
    }

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({
            ...songInfo, 
            currentTime:current, 
            duration
        });
    }



    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    type="range" 
                    min={0} 
                    max={songInfo.duration}
                    value={songInfo.currentTime ?? 0}
                    onChange={dargHandler}
                    onMouseUp={continuePlay}
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size='2x' icon={plaing ? faPlay : faPause} />
                <FontAwesomeIcon className="skip-forward" size='2x' icon={faAngleRight} />
            </div>
            <audio 
                onTimeUpdate={timeUpdateHandler} 
                ref={audioRef} 
                src={song.audio}
                onLoadedMetadata={timeUpdateHandler}
            ></audio>
        </div>
    )
}

export default Player