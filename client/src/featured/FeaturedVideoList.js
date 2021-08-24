import React from 'react';
import FeaturedVideoItem from './FeaturedVideoItem';
import "../search/video.css";


const FeaturedVideoList = ({videos , handleVideoSelect}) => {
    
    const renderedVideos = videos.map((video) => {
        if(video.id === undefined){
            return(
                <div>
                  <br></br>
                  <p style={{ fontSize: "25px" }}></p>
                </div>)
        }else{
            return(
                <div>
                    <FeaturedVideoItem className="video-list" key={video.id} video={video} handleVideoSelect={handleVideoSelect} />
                    </div>
            )
        }
    })
    return <div >{renderedVideos}</div>;
};
export default FeaturedVideoList;