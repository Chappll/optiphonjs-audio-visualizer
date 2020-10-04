import songFile from '../audio/MarchingBands.mp3'
import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';


function Canvas() {
    //const audioElement = new Audio(songFile);
    const [audio, setAudio] = React.useState(new Audio(songFile))
    const [volume, setVolume] = React.useState(0.2)
    audio.volume = volume;
    const [playSong, setPlay] = React.useState(false)

    useEffect(() => {
        const context = new AudioContext()
        const src = context.createMediaElementSource(audio)
        const analyser = context.createAnalyser()
        src.connect(analyser)
        analyser.connect(context.destination)
        const frequency_array = new Uint8Array(analyser.frequencyBinCount);
      }, []);

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

    const handleChange = (event, newValue) => {
        setVolume(newValue);
      };
    
      

    return(
        // <button onClick={song.play}>Play</button>
        <div>
            <button onClick={songSelect()}>Select song</button>
            <button onClick={playSong ? songPause : songPlay}>{playSong ? 'Pause' : 'Play'}</button>
            
            <div>
                <Slider min={0} max={1} step={0.01} onChange={handleChange} ></Slider>
            </div>
        </div>
    );   
}

export default Canvas