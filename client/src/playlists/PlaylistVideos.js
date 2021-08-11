import React, {useState , useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import PlayingPlaylistVideo from "./PlayingPlaylistVideo";
import Alert from "../common/Alert";
import ListOfPlaylists from "./ListOfPlaylists";
import VideoContext from "../auth/VideoContext";
import VideoItem from "../search/VideoItem";
import axios from "axios";
import Youtube from "../api/VideosApi";;


function PlaylistVideos(){
    const [selectedVideo, setSelectedVideo] = useState(null);
    // const { video } = useContext(VideoContext);
//    console.log(video.id.videoId);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
     const [errors, setErrors] = useState([]);
   const {currentUser} = useContext(UserContext);
  const {playlist_name} = useParams();
     console.log(playlist_name);
    console.log(currentUser.username)
    let username = currentUser.username;
//     let addedVideo;

   let videosGot;

const [videoIds, setVideoIds] = useState([]);
const [renderedVideos, setRenderedVideos] = useState([]);
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
    useEffect(function callGetVideoIds(){
        getVideoIds(playlist_name);
      }, [playlist_name]);
   

async function getVideoIds(playlist_name){
    try{
        
        const result = await GrooveApi.getVideos(username, playlist_name);
        setVideoIds(result);
        
    }catch(errors){
        setErrors(errors)
        return;
    }
}
console.log(videoIds);


async function renderVideos(){
    console.log("renderVideos called")
    console.log(videoIds);
    try{
        console.log(videoIds);
     const allVideos = videoIds.map(async videoId=>{
         const video = await  Youtube.get('/videos',{
            params:{
                id : videoId.api_video_id
            }
})
    return video;
})
 videosGot = await Promise.all(allVideos);
    console.log(videosGot)
   
   
        setRenderedVideos(videosGot);
        
    } catch (errors){
        console.error("data fetch failed", errors);
      return { success: false, errors};
    }
}
useEffect(function callRenderVideos(){
    renderVideos();
  }, [videoIds]);

  function handleVideoSelect(video){
    setSelectedVideo(video);
    console.log(selectedVideo);
}
console.log(renderedVideos);
const displayVideos =  renderedVideos.map((video) => {
    return(
    <div>
        
    <VideoItem className="video-list" key={video.data.items[0].id.videoId} video={video.data.items[0]} handleVideoSelect={handleVideoSelect}/>
   
    </div>
)});



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
       <div className="eleven wide column">
                 <PlayingPlaylistVideo video={selectedVideo}/>
             </div>
       <div >{displayVideos}</div>;
       </>
   )
}

export default PlaylistVideos;