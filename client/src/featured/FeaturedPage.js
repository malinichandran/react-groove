import React, {useState, useEffect} from 'react';
import featuredApi from "../api/featuredApi";
import "./FeaturedPage.css";
import FeaturedVideoList from "./FeaturedVideoList";
import FeaturedVideoDetail from "./FeaturedVideoDetail";

function FeaturedPage(){
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  useEffect( function callGetFeaturedVideos(){
    getFeaturedVideos()
  },[]);
  
  async function getFeaturedVideos(){
    try{
      const response = await featuredApi.get('/videos');
      setVideos(response.data.items);
      console.log("this is featured response",response);
    }catch(errors){
      console.error("data fetch failed", errors);
      return { success: false, errors};
    }
  }

  function handleVideoSelect(video){
    setSelectedVideo(video);
}
console.log(selectedVideo);
    return(
      <>  
           <div className="eleven wide column">
               <FeaturedVideoDetail video={selectedVideo}/>
           </div>
            <div className="five wide column">
           <h1 className="FeaturedPageh1">Most popular videos</h1>
               <FeaturedVideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
              
            </div> 
           
   </>
    )
   
}

export default FeaturedPage ;