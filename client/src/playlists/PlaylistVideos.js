import React, {useState , useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import Alert from "../common/Alert";
import ListOfPlaylists from "./ListOfPlaylists";
import VideoContext from "../auth/VideoContext";


function PlaylistVideos(){
   // const { video } = useContext(VideoContext);
   //console.log(video.id.videoId);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
     const [errors, setErrors] = useState([]);
   const {currentUser} = useContext(UserContext);
  const {playlist_name} = useParams();
     console.log(playlist_name);
    console.log(currentUser.username)
    let username = currentUser.username;
//     let addedVideo;

    useEffect(function callGetVideos(){
        getVideos(playlist_name);
      }, []);

const [videos, setVideos] = useState([]);
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
async function getVideos(playlist_name){
    console.log("getVideoscalled")
    try{
        
        const result = await GrooveApi.getVideos(username, playlist_name);
        console.log(result);
        setVideos(result);
    }catch(errors){
        setErrors(errors)
        return;
    }
}
console.log(videos);
   return(
      <>
      {/* <div>
           
          {errors.length
                  ? <Alert type="danger" messages={errors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Video added to playlist successfully."]} />
                  : null}
                
       </div> */}
       {/* <div>
           {videos.map(video=>
            <li key={video.id}>{video.api_video_id}</li>
           
               
           )}
       </div> */}
       
       </>
   )
}

export default PlaylistVideos;