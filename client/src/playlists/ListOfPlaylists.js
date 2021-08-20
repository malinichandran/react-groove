import React, { useState, useEffect, useContext } from "react";
import {Link, useHistory} from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import { useParams } from "react-router-dom";
import PlaylistVideos from "./PlaylistVideos";
import { Button, Card } from "react-bootstrap";
import "./ListOfPlaylists.css";


const ListOfPlaylists = ({videoId}) => {
  console.log(videoId)
    //console.log("video : "+ video.id);
  // let videoData = video.id.videoId;
  // console.log(videoData);
  const [video, setVideo] = useState(videoId);
  const history = useHistory();
    const { currentUser } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
      const [errors, setErrors] = useState([]);
    const [videoToAdd, setVideoToAdd] = useState(null);

    const {playlist_name} = useParams();
    
    let addedVideo;
    
    useEffect(function callGetPlaylists(){
      getPlaylists();
    }, []);
      
      let username;
    async function getPlaylists(){
        username = currentUser.username;
        try{
          
          let result = await GrooveApi.getPlaylists(username)
          
          setPlaylists(result);
        } catch (errors){
          console.error("Error fetching data", errors);
          return { success: false, errors };
        }
      }
      
     
  
    // function handleClick(){
    //   setVideoToAdd(videoId);
    // }
      
    //   useEffect(function callAddVideo(){
    //       addVideo(videoId);
    //     }, []);
      // const [videos, setVideos] = useState([]);
      // async function addVideo(videoId,playlist_name){
      //   username = currentUser.username;
        
      //    console.log(playlist_name)
      //    console.log(username);
      //     console.log("Addvideo: videodata"+ videoId)  
      //     //console.log("addvideo : videoid "+)
      //     try{
      //         console.log("addvideo called");
      //         addedVideo = await GrooveApi.addVideo(playlist_name, username, videoId );
      //         return addedVideo;
      //         history.push(`/playlists/${playlist_name}`)
      //     }catch(errors) {
      //      setErrors(errors);
      //      return
      //     }
      //     setErrors([]);
      //     setSaveConfirmed(true);
      // }
    console.log(video)

 return(
     <div>
       
         {/* <ul>
             {playlists.map(playlist=>
                <li key={playlist.id}><Link className="playlistlink" 
                to={`/playlists/${playlist.playlist_name}`} onClick={addVideo}> {playlist.playlist_name} </Link></li>)}
                
         </ul> */}
         <Card className="playlistcardstyle">
           <Card.Title className="playlistcardtitle">{currentUser.username}'s Playlists</Card.Title>
           <Card.Text>
         <ul>

             {playlists.map(playlist=>
             
                <li key={playlist.id}><Link className="playlistlink" 
                to={{
                  pathname:`/playlists/${playlist.playlist_name}`,
                  state: {video}
                  
                }}> {playlist.playlist_name} </Link></li>)}
                
         </ul>
         <Button  variant="light secondary"><Link className="Buttonlink" to="/addplaylist">Create New Playlist</Link></Button>
         </Card.Text>
         </Card>
        
     </div>
 )
}

export default ListOfPlaylists;