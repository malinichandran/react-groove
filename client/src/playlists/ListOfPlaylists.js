import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import { useParams } from "react-router-dom";
import PlaylistVideos from "./PlaylistVideos";


const ListOfPlaylists = ({videoId}) => {
  console.log(videoId)
    //console.log("video : "+ video.id);
  // let videoData = video.id.videoId;
  // console.log(videoData);
    const { currentUser } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
      const [errors, setErrors] = useState([]);
    const [videoToAdd, setVideoToAdd] = useState(null);

      const {playlist_name} = useParams();
      console.log("playlist name:" +playlist_name);
      console.log("User name :" +currentUser.username)
      let username = currentUser.username;
      let addedVideo;
      
    useEffect(function callGetPlaylists(){
      getPlaylists();
    }, []);

    async function getPlaylists(){
        let username = currentUser.username;
        try{
          let result = await GrooveApi.getPlaylists(username)
          setPlaylists(result);
        } catch (errors){
          console.error("Error fetching data", errors);
          return { success: false, errors };
        }
      }
      
    function handleClick(){
      setVideoToAdd(videoId);
    }
      
    //   useEffect(function callAddVideo(){
    //       addVideo(videoId);
    //     }, []);
    //  // const [videos, setVideos] = useState([]);
    //   async function addVideo(videoId){
          
         
    //       console.log("Addvideo: videodata"+ videoId)  
    //       //console.log("addvideo : videoid "+)
    //       try{
    //           console.log("addvideo called");
    //           addedVideo = await GrooveApi.addVideo(playlist_name, username, videoToAdd );
    //           return addedVideo;
    //       }catch(errors) {
    //        setErrors(errors);
    //        return
    //       }
    //       setErrors([]);
    //       setSaveConfirmed(true);
    //   }

 return(
     <div>
         <ul>
             {playlists.map(playlist=>
                <li key={playlist.id}><Link to={`/playlists/${playlist.playlist_name}`} onClick={handleClick}> {playlist.playlist_name} </Link></li>)}
                
         </ul>
        
     </div>
 )
}

export default ListOfPlaylists;