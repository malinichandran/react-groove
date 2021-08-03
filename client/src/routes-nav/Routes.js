import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

import ListOfPlaylists from "../playlists/ListOfPlaylists";
import PrivateRoute from "../routes-nav/PrivateRoute";


/** Site-wide routes
 * 
 * parts of site should only be visitable when logged in. Those routes are 
 * wrapped by <PrivateRoute>, which is an authorization component.
 * 
 * visiting a non-existent route redirects to the homepage
 */

 function Routes({ login, signup , playlists}){
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `signup=${typeof signup}`,
    
    );
    console.log(playlists)
    
    return(
        <div className="pt-5">
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/login">
                     <LoginForm login={login} />
               </Route>

               <Route exact path="/signup">
                     <SignupForm signup={signup} />
              </Route>
              <PrivateRoute exact path="/playlists">
                  <ListOfPlaylists playlists={()=>playlists}/>
              </PrivateRoute>
              
            </Switch>
        </div>
    )
 }

 export default Routes;