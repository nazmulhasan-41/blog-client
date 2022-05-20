import React from 'react';
import Home_sec1 from './Home_sec1/Home_sec1';
import Home_sec2 from './Home_sec2/Home_sec2';
import Home_sec3 from './Home_sec3/Home_sec3';
import Home_sec4 from './Home_sec4/Home_sec4';

const HomePage = () => {
    return (
        <div>
            <div className='section1' style={{backgroundColor:'ButtonFace'}} >
                <Home_sec1></Home_sec1>
            </div>
            <div className='section1' style={{backgroundColor:'GrayText'}}>
                <Home_sec2></Home_sec2>
            </div>
            <div className='section2' style={{backgroundColor:'ButtonFace'}}>
                <Home_sec3></Home_sec3>
            </div>
            <div className='section3' style={{backgroundColor:'GrayText'}}>
                <Home_sec4></Home_sec4>
            </div>
        </div>
    )
};

export default HomePage;