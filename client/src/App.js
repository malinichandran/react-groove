import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes.js";
import LoadingSpinner from "./common/LoadingSpinner";
import UserContext from "./auth/UserContext";
import GrooveApi from "./api/api";
import jwt from "jsonwebtoken";
import SearchBar from './search/SearchBar';
import youtube from './api/Youtube';
import VideoList from './search/VideoList';
import VideoDetail from './search/VideoDetail';


//key name for storing token in local storage for "remember-me" re login

export const TOKEN_STORAGE_ID = "groove-token";

/** Groove application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

 function App(){
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
);

// Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo(){
      console.debug("App useEffect loaduserinfo", "token=", token);

      async function getCurrentUser(){
          if(token){
              try{
                  let { username } = jwt.decode(token);
                  // put the token on the Api class so it can use it to call the API.
                  GrooveApi.token = token;
                  let currentUser = await GrooveApi.getCurrentUser(username);
                  setCurrentUser(currentUser);
              } catch(err){
                console.error("App loadUserInfo: problem loading", err);
                setCurrentUser(null);
              }
          }
          setInfoLoaded(true);
        }
          // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
          setInfoLoaded(false);
          getCurrentUser();
      }
, [token]);

/** handles site-wide logout */
 function logout() {
    setCurrentUser(null);
    setToken(null);
 }

 /*** Handles site-wide signup
  * 
  * Automatically logs them in (Set token) upon signup.
  * 
  * 
  */

  async function signup(signupData){
      try{
          let token = await GrooveApi.signup(signupData);
          setToken(token);
          return { success: true};
      } catch (errors) {
          console.error("signup failed", errors);
          return { success: false, errors };
      }
  }

  /**Handles site-wide login */
  async function login(loginData) {
      try{
          let token = await GrooveApi.login(loginData);
          setToken(token);
          return { success: true};
      } catch (errors) {
          console.error("login failed", errors);
          return { success: false, errors};
      }
  }
 
  async function handleSubmit(termFromSearchBar){
      try{
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        setVideos(response.data.items);
        console.log("this is response", response);
      } catch (errors){
        console.error("data fetch failed", errors);
        return { success: false, errors};
      }
  }

  function handleVideoSelect(video){
      setSelectedVideo(video);
  }
  
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

  if(!infoLoaded) return <LoadingSpinner/>;

  return(
      <>
      <BrowserRouter>
      
        <UserContext.Provider
          value={{ currentUser, setCurrentUser}}>
              <div className="App">
                  <Navigation logout={logout}/>
                  <Routes login={login} signup={signup} playlists={getPlaylists}/>
              </div>
        
      <div className='ui container' style={{marginTop: '1em'}}>
      <SearchBar handleFormSubmit={handleSubmit}/>
      <div className='ui grid'>
          <div className="ui row">
              <div className="eleven wide column">
                  <VideoDetail video={selectedVideo}/>
              </div>
              <div className="five wide column">
                  <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
              </div>
          </div>
      </div>
  </div>
  </UserContext.Provider>
        
      </BrowserRouter>
  </>
  );
}

export default App;