import songFile from '../audio/MarchingBands.mp3'
import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';

// Changing Variables
let ctx, x_end, y_end, bar_height;

//Constants 
const width = window.innerWidth;
const height = window.innerHeight;
const bars = 555;
const bar_width = 1;
const radius = 0;
const center_x = width / 2;
const center_y = height / 2;
let context = new AudioContext()
const analyser = context.createAnalyser()
let rafId;
const frequency_array = new Uint8Array(analyser.frequencyBinCount)


function Canvas() {
    //const audioElement = new Audio(songFile);
   
    const [audio] = React.useState(new Audio(songFile))
    const [volume, setVolume] = React.useState(0.2)
    audio.volume = volume;
    const [playSong, setPlay] = React.useState(false)
    const [canvas] = React.useState(React.createRef())


    useEffect(() => {        
        const src = context.createMediaElementSource(audio)
        src.connect(analyser)
        analyser.connect(context.destination)
        
        console.log(src)
        
        return function cleanup() {
            cancelAnimationFrame(rafId)
            analyser.disconnect()
            src.disconnect()
            console.log("hello me old chum")
          };
        
      }, [audio]);

    function songSelect() {
        
    }

    function songPlay() {
        setPlay(true) 
        rafId = requestAnimationFrame(tick)      
        audio.play();
        context.resume();
        console.log('playing song')   
        console.log(playSong)    
    }

    function songPause() {
        setPlay(false)   
        audio.pause();
        cancelAnimationFrame(rafId);
        console.log('playing song')   
        console.log(playSong)   
    }

    const handleChange = (event, newValue) => {
        setVolume(newValue);
      };
    
    function animationLooper(canvas) {
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");

        for (var i = 0; i < bars; i++) {
            //divide a circle into equal part
            const rads = Math.PI * 2 / bars;

            // Math is magical
            bar_height = frequency_array[i] * 2;

            const x = center_x + Math.cos(rads * i) * (radius);
            const y = center_y + Math.sin(rads * i) * (radius);
            x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
            y_end = center_y + Math.sin(rads * i) * (radius + bar_height);

            //draw a bar
            drawBar(x, y, x_end, y_end, frequency_array[i], ctx, canvas);
        }

        function drawBar(x1=0, y1=0, x2=0, y2=0, frequency, ctx, canvas) {
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
            gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
            ctx.fillStyle = gradient;
    
            const lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = bar_width;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    
    const tick = () => {
        animationLooper(canvas.current);
        analyser.getByteTimeDomainData(frequency_array);
        rafId = requestAnimationFrame(tick)
    }



    return(
        // <button onClick={song.play}>Play</button>
        <div>
            <button onClick={songSelect()}>Select song</button>
            <button onClick={playSong ? songPause : songPlay}>{playSong ? 'Pause' : 'Play'}</button>
            
            <div>
                <Slider min={0} max={1} step={0.01} onChange={handleChange} ></Slider>
                <canvas ref={canvas} />
            </div>
        </div>
    );   
}

export default Canvas