import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";


const ListOfPlaylists = () => {

    const { currentUser } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    
    useEffect(function callGetPlaylists(){
      getPlaylists();
    }, []);

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
     
console.log(playlists);
 return(
     <div>
         <ul>
             {playlists.map(playlist=>
                <li key={playlist.id}><Link  to={`/playlists/${playlist.playlist_name}`}>{playlist.playlist_name}</Link></li>)}
         </ul>
     </div>
 )
}

export default ListOfPlaylists;