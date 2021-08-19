import React, { useContext } from "react";
import { Link } from "react-router-dom";
import"./Homepage.css";
import UserContext from "../auth/UserContext";
import SearchBar from "../search/SearchBar";
import Searchbar from "../search/SearchBar";
import FeaturedPage from "../featured/FeaturedPage";

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
 //   console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div className="Homepage">
                
             {/* <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">
                    Groove
                </h1>
                <h2 className="lead">
                    One stop for all your favorite music
                </h2> */}

                {currentUser
                   ? 
                   <div>
                   {/* <h2>
                       Welcome Back, {currentUser.first_name || currentUser.username}!
                       
                   </h2> */}
                   <FeaturedPage/>
                   </div>
                   : (
                    <div className="container text-center">
                    <h1 className="mb-4 font-weight-bold">
                        Groove
                    </h1>
                    <h2 className="lead">
                        One stop for all your favorite music
                    </h2> 
                       <p>
                           <Link className="btn btn-dark btn-secondary font-weight-bold mr-3" to="/login">
                            Log in
                           </Link>
                           <Link className="btn btn-dark btn-secondary font-weight-bold" to="/signup">
                            Sign Up
                           </Link>
                          
                       </p>
                       </div>
                   )}
             
            {/* <FeaturedPage/> */}
        </div>
    );
}

export default Homepage;