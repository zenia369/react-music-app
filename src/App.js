import React, {useState, useRef} from 'react';
import './styles/app.scss';

import Player from './components/Player/Player';
import Song from './components/Song/Song';

import data from './util';
import Library from './components/LibrarySongs/Library';
import Nav from './components/Nav/Nav';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaing, setIsPlaing] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [activeLibrary, setActiveLibrary] = useState(false);

  const audioRef = useRef();

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
        ...songInfo, 
        currentTime:current, 
        duration,
        animationPercentage
    });
  }

  const dargHandler = (e) => {
    const value = e.target.value;

    audioRef.current.pause();
    setIsPlaing(false);
    audioRef.current.currentTime = value;

    setSongInfo({
      ...songInfo,
      currentTime: value
    });
  }

  const continuePlay = () => {
    audioRef.current.play();
    setIsPlaing(true);
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((el) => el.id === currentSong.id);

    if(currentIndex === songs.length - 1) currentIndex = -1;

    currentIndex++;

    await setCurrentSong(songs[currentIndex]);

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

  setSongs(updateSongs);

  const plaingPromise = audioRef.current.play();
  if(plaingPromise !== undefined) {
    plaingPromise
      .then(audio => {
        audioRef.current.pause();
      })
      .catch(() => {
        audioRef.current.play();
      })
  }

}


  return (
    <div className={`App ${activeLibrary ? 'library-active' : ''}`}>
      <Nav
        activeLibrary={activeLibrary}
        setActiveLibrary={setActiveLibrary}
      />

      <Song currentSong={currentSong} />
      <Player 
        plaing={isPlaing} 
        setPlaing={setIsPlaing} 
        currentSong={currentSong} 
        audioRef={audioRef}
        dargHandler={dargHandler}
        continuePlay={continuePlay}
        songInfo={songInfo}
        songs={songs} 
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />

      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong} 
        audioRef={audioRef}
        plaing={isPlaing} 
        setSongs={setSongs}
        activeLibrary={activeLibrary}
      />

      <audio 
          onTimeUpdate={timeUpdateHandler} 
          ref={audioRef} 
          src={currentSong.audio}
          onLoadedMetadata={timeUpdateHandler}
          onEnded={songEndHandler}
      />
    </div>
  );
}

export default App;
