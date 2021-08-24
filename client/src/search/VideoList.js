import React from "react";
import VideoItem from "./VideoItem";
import "./video.css";

const VideoList = ({ videos, handleVideoSelect }) => {
  const renderedVideos = videos.map((video) => {
    if (video.id.videoId === undefined) {
      return(
        <div>
          <br></br>
          <p style={{ fontSize: "25px" }}></p>
        </div>)
    } else {
      return (
        <div>
          <VideoItem
            className="video-list"
            key={video.id.videoId}
            video={video}
            handleVideoSelect={handleVideoSelect}
          />
        </div>
      );
    }
  });
  return <div>{renderedVideos}</div>;
};
export default VideoList;
