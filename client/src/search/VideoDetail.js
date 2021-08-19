import React, { useState, useEffect, useContext } from "react";
import GrooveApi from "../api/api";
import UserContext from "../auth/UserContext";
import VideoContext from "../auth/VideoContext";
import "./video.css";
import ListOfPlaylists from "../playlists/ListOfPlaylists";


import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PlaylistVideos from "../playlists/PlaylistVideos";

const VideoDetail = ({ video }) => {
  const [show, setShow] = useState(false);
    const [errors, setErrors] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const { currentUser } = useContext(UserContext);
  

  if (!video) {
    return <div>
      
       <br></br>
       <p style={{fontSize:'25px'}}>
      

       </p>
    </div>
  }
 console.log(video)
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  //console.log(typeof video);
  return (
    <div>
      
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        
        
        {/* <Button variant="secondary" >
      {/* <Link className="link" to="/playlists"> Add to playlist </Link> */}
      
      {/* </Button> */} 
      <Button variant="warning" onClick={handleShow}>
         Add to Playlist
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Choose a playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <ListOfPlaylists videoId={video.id.videoId}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
           
          </Modal.Footer>
        </Modal>
      
        
        
      </div>
      
    </div>
  );
};

export default VideoDetail;