import React from 'react';
import "./FeaturedPage.css";

const FeaturedVideoItem = ({video, handleVideoSelect}) => {
    return (
        <>
        <div onClick={ () => handleVideoSelect(video)} className=' video-item item'>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            
                <div className='header '>{video.snippet.title}</div>
            
            
        </div>
        
       
       </>
    )
}

export default FeaturedVideoItem;