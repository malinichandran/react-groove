import React, { useContext } from "react";
import { Link } from "react-router-dom";
import"./Homepage.css";
import UserContext from "../auth/UserContext";
import SearchBar from "../search/SearchBar";

/*** Homepage of site 
 * 
 * Shows Welcome message or login/ register buttons.
 * 
 * Routed at /
 * 
 * Routes -> Homepage
*/

function Homepage() {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div className="Homepage">
                 <div >
                    <SearchBar/>
                </div>
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">
                    Groove
                </h1>
                <p className="lead">
                    One stop for all your favorite music
                </p>

                {currentUser
                   ? <h2>
                       Welcome Back, {currentUser.first_name || currentUser.username}!
                   </h2>
                   : (
                       <p>
                           <Link className="btn btn-dark font-weight-bold mr-3" to="/login">
                            Log in
                           </Link>
                           <Link className="btn btn-dark font-weight-bold" to="/signup">
                            Sign Up
                           </Link>
                          
                       </p>
                   )}
            </div>
        </div>
    );
}

export default Homepage;