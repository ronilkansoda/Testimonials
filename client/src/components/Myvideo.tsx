import React from 'react';
import MyVid from "../assets/office_loop.mp4"
function Myvideo() {
    return (
        <div  >
            <video  
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" className='bg-vid' >
                <source src={MyVid} type="video/mp4"/>
            </video>            
      </div>
    );
}

export default Myvideo;