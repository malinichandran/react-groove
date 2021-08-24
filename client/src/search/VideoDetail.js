import React, { useState } from "react";
import "./video.css";
import ListOfPlaylists from "../playlists/ListOfPlaylists";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const VideoDetail = ({ video }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!video) {
    return (
      <div>
        <br></br>
        <p style={{ fontSize: "25px" }}></p>
      </div>
    );
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <Button variant="warning" onClick={handleShow}>
          Add to Playlist
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header className="Modalheader">
            <Modal.Title>Choose a playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body className="Modal Modalbody">
            <ListOfPlaylists videoId={video.id.videoId} />
          </Modal.Body>
          <Modal.Footer className="Modalfooter">
            <Button
              className="modalbutton"
              variant="light secondary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default VideoDetail;
