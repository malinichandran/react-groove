import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import "../search/SearchBar";
import Searchbar from "../search/SearchBar";

/** Navigation bar for site. Shows up on every page.
 * 
 * when user is logged in, shows links to main areaa of site, when not
 * shows link to login and signup forms.
 * 
 * Rendered by App.
 */

 function Navigation( {logout} ) {
    const { currentUser } = useContext(UserContext);
    //console.debug("Navigation", "currentUser=", currentUser);

    function loggedInNav(){
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/profile">
                     Profile
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/playlists">
                     Playlists
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/community">
                     Community
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/" onClick={logout}>
                     Log out {currentUser.first_name || currentUser.username}
                    </NavLink>
                </li>
                
            </ul>
        );
    }

    function loggedOutNav() {
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-Link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-Link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
                
            </ul>
        );
    }

    return(
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                Groove
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
 }

 export default Navigation;