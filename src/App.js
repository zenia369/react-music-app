import React, {useState} from 'react';
import './styles/app.scss';

import Player from './components/Player/Player';
import Song from './components/Song/Song';

import data from './util';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaing, setIsPlaing] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player plaing={isPlaing} setPlaing={setIsPlaing} currentSong={currentSong} />
    </div>
  );
}

export default App;
