import React, { useState } from "react";
import "./SearchBar.css";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import youtube from "../api/Youtube";

function Searchbar() {
  const [term, setTerm] = useState();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  async function handleFormSubmit(term) {
    try {
      const response = await youtube.get("/search", {
        params: {
          q: term,
        },
      });
      setVideos(response.data.items);
      console.log("this is response", response);
    } catch (errors) {
      console.error("data fetch failed", errors);
      return { success: false, errors };
    }
  }

  function handleVideoSelect(video) {
    setSelectedVideo(video);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleFormSubmit(term);
  }

  return (
    <>
     
      <div className="search-bar ui segment">
        <form onSubmit={handleSubmit} className="ui form">
          <div className="field">
            <label htmlFor="video-search"></label>
            <input
              onChange={handleChange}
              name="video-search"
              type="text"
              placeholder="Search for your favorite videos.."
            />
            <button className="searchbutton">Search</button>
          </div>
      
        </form>

        <div>
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
