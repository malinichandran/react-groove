import React, { useState, useContext } from "react";
import GrooveApi from "../api/api";
import UserContext from "../auth/UserContext";
import "../style/video.css";
import ListOfPlaylists from "../playlists/ListOfPlaylists";

const VideoDetail = ({ video }) => {
  const { currentUser } = useContext(UserContext);
  const [playlists, setPlaylists] = useState([]);
  
  

  async function handleAddToPlaylist(){
    let username = currentUser.username;
    try{
      let result = await GrooveApi.getPlaylists(username)
      setPlaylists(result);
      console.log(result)
    } catch (errors){
      console.error("Error fetching data", errors);
      return { success: false, errors };
    }
  }

  if (!video) {
    return <div>
      
       <br></br>
       <p style={{fontSize:'25px'}}>
      

       </p>
    </div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(typeof video);
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <button onClick={handleAddToPlaylist}>Add to Playlist</button>
        <ListOfPlaylists playlists={playlists}/>
        <p>{video.snippet.description}</p>
        
        
      </div>
    </div>
  );
};

export default VideoDetail;