import React, { useState, useEffect, useContext } from "react";
import GrooveApi from "../api/api";
import UserContext from "../auth/UserContext";
import VideoContext from "../auth/VideoContext";
import "../search/video.css";
import ListOfPlaylists from "../playlists/ListOfPlaylists";

//import "../playlists/AddPlaylistModal.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PlaylistVideos from "../playlists/PlaylistVideos";

const PlayingPlaylistVideo = ({ video }) => {
  const { currentUser } = useContext(UserContext);
  
  // const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  

  if (!video) {
    return <div>
      
       <br></br>
       <p style={{fontSize:'25px'}}>
      

       </p>
    </div>;
  }
 console.log(video)
  const videoSrc = `https://www.youtube.com/embed/${video.id}`;
  //console.log(typeof video);
  return (
    <div>
      
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        
        
       
        <p>{video.snippet.description}</p>
        
      </div>
     
     
    </div>
  );
};

export default PlayingPlaylistVideo;