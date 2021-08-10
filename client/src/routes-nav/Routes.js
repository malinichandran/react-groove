import React ,{useState, useContext} from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ListOfPlaylists from "../playlists/ListOfPlaylists";
import PrivateRoute from "../routes-nav/PrivateRoute";
import ProfileData from "../profile/ProfileData";
import SearchBar from "../search/SearchBar";
import ProfileForm from "../profile/ProfileForm";
import PlaylistVideos from "../playlists/PlaylistVideos";
import DeleteProfilePage from "../profile/DeleteProfilePage";
/** Site-wide routes
 * 
 * parts of site should only be visitable when logged in. Those routes are 
 * wrapped by <PrivateRoute>, which is an authorization component.
 * 
 * visiting a non-existent route redirects to the homepage
 */

 function Routes({ login, signup, profile }){
     
    // console.debug(
    //     "Routes",
    //     `login=${typeof login}`,
    //     `signup=${typeof signup}`,
    
    // );
    

   
    return(
        <div className="pt-5">
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/login">
                     <LoginForm login={login} />
               </Route>
                <Route exact path="/search">
                    <SearchBar/>
                </Route>
               <Route exact path="/signup">
                     <SignupForm signup={signup} />
              </Route>
              <PrivateRoute exact path="/playlists">
                  <ListOfPlaylists />
              </PrivateRoute>
              <PrivateRoute exact path="/profile">
                    <ProfileData profile={profile}/>
                </PrivateRoute>
                <PrivateRoute exact path="/editprofile">
                    <ProfileForm/>
                </PrivateRoute>
                <PrivateRoute exact path="/deleteprofile">
                    <DeleteProfilePage/>
                </PrivateRoute>
                <PrivateRoute exact path="/playlists/:playlist_name">
                    <PlaylistVideos/>
                </PrivateRoute>

                <Redirect to="/"/>
            </Switch>
        </div>
    )
 }

 export default Routes;