import React from 'react';
import Timer from 'react-compound-timer';

const Time = () => {
    return(
        <Timer startImmediately={true}>
                <div> 
                    <Timer.Hours />:
                    <Timer.Minutes />:
                    <Timer.Seconds />            
                </div>
        </Timer>
    )
}

export default Time;