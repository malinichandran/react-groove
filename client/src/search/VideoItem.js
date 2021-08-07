import React, {useState, useContext} from 'react';
import { useParams } from "react-router-dom";
import './video.css';
import PlaylistVideos from "../playlists/PlaylistVideos";
import ListOfPlaylists from "../playlists/ListOfPlaylists";
import UserContext from "../auth/UserContext";

const VideoItem = ({video , handleVideoSelect}) => {
    console.log(video.id.videoId)

    return (
        <>
        <div onClick={ () => handleVideoSelect(video)} className=' video-item item'>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header '>{video.snippet.title}</div>
            </div>
            
        </div>
        <ListOfPlaylists videoId={video.id.videoId}/>
       </>
    )
};
export default VideoItem;