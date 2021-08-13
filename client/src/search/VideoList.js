import React from 'react';
import VideoItem from './VideoItem';
import "./video.css";
import ListOfPlaylists from "../playlists/ListOfPlaylists";

const VideoList = ({videos , handleVideoSelect}) => {
    // const renderedVideos =  videos.map((video) => {
    //     return(
    //     <div>
            
    //     <VideoItem className="video-list" key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
       
    //     </div>
    // )});
    const renderedVideos = videos.map((video) => {
        if(video.id.videoId === undefined){
            return;
        }else{
            return(
                <div>
                    <VideoItem className="video-list" key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
                </div>
            )
        }
    })
    return <div >{renderedVideos}</div>;
};
export default VideoList;