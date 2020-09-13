import songFile from '../audio/MarchingBands.mp3'
import React from 'react';

function Canvas() {
    //const audioElement = new Audio(songFile);
    const [audio, setAudio] = React.useState(new Audio(songFile))
    const [volume, setVolume] = React.useState(0.2)
    audio.volume = volume;
    const [playSong, setPlay] = React.useState(false)

    function songSelect() {
        
    }

    function songPlay() {
        setPlay(true)       
        audio.play();
        console.log('playing song')   
        console.log(playSong)    
    }

    function songPause() {
        setPlay(false)   
        audio.pause();
        console.log('playing song')   
        console.log(playSong)   
    }
    return(
        // <button onClick={song.play}>Play</button>
        <div>
            <button onClick={songSelect()}>Select song</button>
            <button onClick={playSong ? songPause : songPlay}>{playSong ? 'Pause' : 'Play'}</button>
            
        </div>
    );   
}

export default Canvas