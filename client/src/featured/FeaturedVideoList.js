import React from 'react';
import FeaturedVideoItem from './FeaturedVideoItem';
import "../search/video.css";
import ListOfPlaylists from "../playlists/ListOfPlaylists";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const FeaturedVideoList = ({videos , handleVideoSelect}) => {
    // const renderedVideos =  videos.map((video) => {
    //     return(
    //     <div>
            
    //     <VideoItem className="video-list" key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
       
    //     </div>
    // )});
    
    const renderedVideos = videos.map((video) => {
        if(video.id === undefined){
            return;
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