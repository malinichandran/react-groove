import React , {useState, useContext} from 'react';
import "./FeaturedPage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function FeaturedVideoDetail({video}){
    
    
    
    if (!video) {
        return <div>
          
           <br></br>
           <p style={{fontSize:'25px'}}>
          
    
           </p>
        </div>
      }
   console.log(video)
   
const videoSrc = `https://www.youtube.com/embed/${video.id}`;

return(
    
    <div className="FeaturedVideoDetail">
      
       <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" >

        <p >{video.snippet.title}</p>
        </iframe>
      </div>
      
        </div>
)
}

export default FeaturedVideoDetail;