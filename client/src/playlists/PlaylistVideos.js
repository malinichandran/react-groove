import React, {useState , useContext, useEffect} from "react";
import { useParams, useLocation} from "react-router-dom";
import {Link, useHistory} from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import PlayingPlaylistVideo from "./PlayingPlaylistVideo";
import Alert from "../common/Alert";
import ListOfPlaylists from "./ListOfPlaylists";
import VideoContext from "../auth/VideoContext";
import VideoItem from "../search/VideoItem";
import axios from "axios";
import Youtube from "../api/VideosApi";
import {Button, Modal} from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import "./PlaylistVideos.css";


function PlaylistVideos(){
    const location = useLocation();
    const video = location.state?.video;
    const history = useHistory();
    const [selectedVideo, setSelectedVideo] = useState(null);
   let videoId;
    console.log(video);
    const [show, setShow] = useState(false);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
     const [errors, setErrors] = useState([]);
   const {currentUser} = useContext(UserContext);
  const {playlist_name} = useParams();
     console.log(playlist_name);
    console.log(currentUser.username)
    let username = currentUser.username;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let addedVideo;

   let videosGot;

const [videoIds, setVideoIds] = useState([]);
const [renderedVideos, setRenderedVideos] = useState([]);
useEffect(function callAddVideo(){
    addVideo(video);
},[])

    async function addVideo(video){
        let videoData = {
            api_video_id: video,
            website: 'Youtube'
            
        }
        console.log(videoData)
        try{
            console.log("addvideo called")
            addedVideo = await GrooveApi.addVideo(playlist_name, username, videoData )

        }catch(errors) {
         setErrors(errors);
         return
        }
        setErrors([]);
        setSaveConfirmed(true);
        history.push(`/playlists/${playlist_name}`)
        window.location.reload();
        
    }

   
    //addVideo()
    useEffect(function callGetVideoIds(){
        getVideoIds(playlist_name);
      }, []);
   

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

async function removeVideo(videoId){
    
    try{
    let deleteVideo = await GrooveApi.removeVideo(username, playlist_name, videoId)
    history.push(`/playlists/${playlist_name}`);
    window.location.reload();   
    }catch(errors){
    setErrors(errors);
    }
}
const displayVideos =  renderedVideos.map((video) => {
   // videoId = video.data.items[0].id
    
    return(
    <div>
       
    <VideoItem className="video-list" key={video.data.items[0].id} video={video.data.items[0]} handleVideoSelect={handleVideoSelect}/>
     <p className="trash-align"><Link><FaTrashAlt className="trash" onClick={()=>removeVideo(video.data.items[0].id)}/></Link></p>
   
    </div>
)});

let deleteAction
console.log(playlist_name);

async function deletePlaylist(){
    try{
        deleteAction = await GrooveApi.deletePlaylist(playlist_name);
        history.push("/playlists");
    }catch(errors){
        setErrors(errors);
    }
}
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
       <h3 className="namestyle">{`${playlist_name}`}</h3>
       <div className="eleven wide column">
       
                 <PlayingPlaylistVideo video={selectedVideo}/>
             </div>
       <div >{displayVideos}</div>;
       <div className="button">
       <Button className="btn btn-secondary"><Link className="link" to={`/editplaylist/${playlist_name}`}>Edit Playlist</Link></Button>
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
          <Modal.Header>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           Proceeding with this action will delete all your videos in this playlist. Do you wish to proceed?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={deletePlaylist}>Yes, delete this playlist</Button>
          </Modal.Footer>
        </Modal>
       </>
   )
}

export default PlaylistVideos;