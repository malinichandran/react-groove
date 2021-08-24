import React, { useContext } from "react";
import { Link } from "react-router-dom";
import"./Homepage.css";
import UserContext from "../auth/UserContext";
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

    return (
        <div className="Homepage">

                {currentUser
                   ? 
                   <div>
                  
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
        </div>
    );
}

export default Homepage;