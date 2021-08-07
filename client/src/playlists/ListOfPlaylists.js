import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import { useParams} from "react-router-dom";
import PlaylistVideos from "./PlaylistVideos";


const ListOfPlaylists = ({addVideo, videoId}) => {
    
    let videoData = videoId;
    const { currentUser } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
      const [errors, setErrors] = useState([]);
    
      const {playlist_name} = useParams();
      console.log(playlist_name);
      console.log(currentUser.username)
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
      
      // useEffect(function callAddVideo(){
      //     addVideo(username, playlist_name, videoId);
      //   }, []);
      const [videos, setVideos] = useState([]);
      async function addVideo(videoData, playlist_name){
          
         
          console.log(videoData)  
          try{
              console.log("addvideo called")
              addedVideo = await GrooveApi.addVideo(playlist_name, username, videoData )
              return addedVideo
          }catch(errors) {
           setErrors(errors);
           return
          }
          setErrors([]);
          setSaveConfirmed(true);
      }

 return(
     <div>
         <ul>
             {playlists.map(playlist=>
                <li key={playlist.id}><Link to={`/playlists/${playlist.playlist_name}`} onClick={(videoData)=>addVideo}> {playlist.playlist_name} </Link></li>)}
                
         </ul>
     </div>
 )
}

export default ListOfPlaylists;