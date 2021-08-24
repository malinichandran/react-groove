import React from "react";
import "../search/video.css";


const PlayingPlaylistVideo = ({ video }) => {

  if (!video) {
    return <div>
      
       <br></br>
       <p style={{fontSize:'25px'}}>
      

       </p>
    </div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id}`;

  return (
    <div>
      
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
      
        
      </div>
     
     
    </div>
  );
};

export default PlayingPlaylistVideo;