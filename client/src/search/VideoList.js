import React from 'react';
import VideoItem from './VideoItem';
import ListOfPlaylists from "../playlists/ListOfPlaylists";

const VideoList = ({videos , handleVideoSelect}) => {
    const renderedVideos =  videos.map((video) => {
        return(
        <div>
            
        <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
       
        </div>
    )});

    return <div className='ui relaxed divided list'>{renderedVideos}</div>;
};
export default VideoList;