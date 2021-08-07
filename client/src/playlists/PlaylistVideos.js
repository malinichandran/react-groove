import React, {useState , useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import Alert from "../common/Alert";
import ListOfPlaylists from "./ListOfPlaylists";
import ListOfVideos from "./ListOfVideos";

function PlaylistVideos({video}){
    console.log(video);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
     const [errors, setErrors] = useState([]);
//    const {currentUser} = useContext(UserContext);
//     const {playlist_name} = useParams();
//     console.log(playlist_name);
//     console.log(currentUser.username)
//     let username = currentUser.username;
//     let addedVideo;

//     useEffect(function callAddVideo(){
//         addVideo(video);
//       }, []);
//     //const [videos, setVideos] = useState([]);
//     async function addVideo(video){
//         let videoData = {
//             api_video_id: video.id.videoId,
            
//         }
//         try{
//             console.log("addvideo called")
//             addedVideo = await GrooveApi.addVideo(playlist_name, username, videoData )

//         }catch(errors) {
//          setErrors(errors);
//          return
//         }
//         setErrors([]);
//         setSaveConfirmed(true);
//     }
    //addVideo()
   return(
      <>
      <div>
           
          {errors.length
                  ? <Alert type="danger" messages={errors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Video added to playlist successfully."]} />
                  : null}
                
       </div>
       <ListOfVideos/> 
       </>
   )
}

export default PlaylistVideos;