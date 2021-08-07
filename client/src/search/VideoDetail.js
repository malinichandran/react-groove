import React, { useState,useEffect, useContext } from "react";
import GrooveApi from "../api/api";
import UserContext from "../auth/UserContext";
import "./video.css";
import ListOfPlaylists from "../playlists/ListOfPlaylists";
import AddPlaylistModal from "../playlists/AddPlaylistModal";
//import "../playlists/AddPlaylistModal.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PlaylistVideos from "../playlists/PlaylistVideos";

const VideoDetail = ({ video }) => {
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

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  //console.log(typeof video);
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        
        
        <Button variant="light" onClick={handleShow}>
      <Link to="/playlists"> Add to playlist </Link>
      
      </Button>
      
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{currentUser.firstName}'s Playlists</Modal.Title>
        </Modal.Header>
        <Modal.Body><ListOfPlaylists/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create New Playlist
          </Button>
        </Modal.Footer>
      </Modal> */}
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;