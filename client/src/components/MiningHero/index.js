import React, { useState, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';


function MiningHero() {
const [timer, setTimer] = useState(0)
const [isActive, setIsActive] = useState(false)
const countRef = useRef(null)


    const handleStart = () => {
        setIsActive(true)
        countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1)
        }, 1000)
    }
    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
    
        return `${getMinutes} : ${getSeconds}`
    }
    
    return (
        <div>
            {/* Need to change size of image/card */}
            <Card className="text-center" style={{ width: '100%' }}>
                <Card.Img variant="" src='./assets/MiningGif.gif' />
                <Card.Body>
                    <Card.Text>
                        Information about mining: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Etiam non quam lacus suspendisse. Facilisis magna etiam tempor orci eu. Id porta nibh venenatis cras sed felis eget velit. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. 
                        Tristique magna sit amet purus. Etiam dignissim diam quis enim lobortis. 
                        Cursus vitae congue mauris rhoncus. Aenean pharetra magna ac placerat. Scelerisque purus semper eget duis at.
                    </Card.Text>
                    {!isActive ? (<Button variant="dark" style={{width: '25%'}} onClick={() => handleStart()}>Start Mining</Button>) : <p>{formatTime()}</p>}
                </Card.Body>
            </Card>
        </div>
    )
}


export default MiningHero;