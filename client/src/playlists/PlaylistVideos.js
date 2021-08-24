import React, { useState, useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import PlayingPlaylistVideo from "./PlayingPlaylistVideo";
import Alert from "../common/Alert";
import VideoItem from "../search/VideoItem";
import Youtube from "../api/VideosApi";
import { Button, Modal } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import "./PlaylistVideos.css";

function PlaylistVideos() {
  const location = useLocation();
  const video = location.state?.video;
  const history = useHistory();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [show, setShow] = useState(false);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [errors, setErrors] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { playlist_name } = useParams();

  let username = currentUser.username;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let addedVideo;

  let videosGot;

  const [videoIds, setVideoIds] = useState([]);
  const [renderedVideos, setRenderedVideos] = useState([]);

  useEffect(
    function callAddVideo() {
      if (video) {
        addVideo(video);
      } else {
        return;
      }
    },
    [video]
  );

  async function addVideo(video) {
    let videoData = {
      api_video_id: video,
      website: "Youtube",
    };
    try {
      addedVideo = await GrooveApi.addVideo(playlist_name, username, videoData);
    } catch (errors) {
      setErrors(errors);
      return;
    }
    setErrors([]);
    setSaveConfirmed(true);
    history.push(`/playlists/${playlist_name}`);
    window.location.reload();
  }

  //addVideo()
  useEffect(function callGetVideoIds() {
    getVideoIds(playlist_name);
  }, []);

  async function getVideoIds(playlist_name) {
    try {
      const result = await GrooveApi.getVideos(username, playlist_name);
      setVideoIds(result);
    } catch (errors) {
      setErrors(errors);
      return;
    }
  }

  async function renderVideos() {
    try {
      const allVideos = videoIds.map(async (videoId) => {
        const video = await Youtube.get("/videos", {
          params: {
            id: videoId.api_video_id,
          },
        });
        return video;
      });
      videosGot = await Promise.all(allVideos);

      setRenderedVideos(videosGot);
    } catch (errors) {
      return { success: false, errors };
    }
  }

  useEffect(
    function callRenderVideos() {
      renderVideos();
    },
    [videoIds]
  );

  function handleVideoSelect(video) {
    setSelectedVideo(video);
  }

  async function removeVideo(videoId) {
    try {
      let deleteVideo = await GrooveApi.removeVideo(
        username,
        playlist_name,
        videoId
      );
      history.push(`/playlists/${playlist_name}`);
      window.location.reload();
    } catch (errors) {
      setErrors(errors);
    }
  }
  const displayVideos = renderedVideos.map((video) => {
    return (
      <div>
        <VideoItem
          className="video-list"
          key={video.data.items[0].id}
          video={video.data.items[0]}
          handleVideoSelect={handleVideoSelect}
        />
        <p className="trash-align">
          <a>
            <FaTrashAlt
              className="trash"
              onClick={() => removeVideo(video.data.items[0].id)}
            />
          </a>
        </p>
      </div>
    );
  });

  let deleteAction;

  async function deletePlaylist() {
    try {
      deleteAction = await GrooveApi.deletePlaylist(playlist_name);
      history.push("/playlists");
    } catch (errors) {
      setErrors(errors);
    }
  }
  return (
    <>
      <div>
        {errors.length ? <Alert type="danger" messages={errors} /> : null}

        {saveConfirmed ? (
          <Alert
            type="success"
            messages={["Video added to playlist successfully."]}
          />
        ) : null}
      </div>
      <h3 className="namestyle">{`${playlist_name}`}</h3>
      <div className="eleven wide column">
        <PlayingPlaylistVideo video={selectedVideo} />
      </div>
      <div>{displayVideos}</div>;
      <div className="button">
        <Button className="btn btn-secondary">
          <Link className="link" to={`/editplaylist/${playlist_name}`}>
            Edit Playlist
          </Link>
        </Button>
        <Button variant="warning" onClick={handleShow}>
          Delete playlist
        </Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="header">
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          Proceeding with this action will delete all your videos in this
          playlist. Do you wish to proceed?
        </Modal.Body>
        <Modal.Footer className="header">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deletePlaylist}>
            Yes, delete this playlist
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PlaylistVideos;
