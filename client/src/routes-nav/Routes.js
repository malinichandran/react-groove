import React ,{useState, useContext} from "react";
import GrooveApi from "../api/api";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import UserContext from "../auth/UserContext";
import ListOfPlaylists from "../playlists/ListOfPlaylists";
import PrivateRoute from "../routes-nav/PrivateRoute";


/** Site-wide routes
 * 
 * parts of site should only be visitable when logged in. Those routes are 
 * wrapped by <PrivateRoute>, which is an authorization component.
 * 
 * visiting a non-existent route redirects to the homepage
 */

 function Routes({ login, signup }){
     const { currentUser } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `signup=${typeof signup}`,
    
    );
    console.log(playlists)
    
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
                  <ListOfPlaylists playlists={getPlaylists}/>
              </PrivateRoute>
              
            </Switch>
        </div>
    )
 }

 export default Routes;